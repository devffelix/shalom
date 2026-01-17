
import { createClient } from '@supabase/supabase-js';
import { AnalyticsAnswerStats, AnalyticsFunnel, AnalyticsTraffic } from '../types';

// Credenciais fornecidas
const SUPABASE_URL = 'https://kptdnvwzyotmexgmwovb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdGRudnd6eW90bWV4Z213b3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTAzNzMsImV4cCI6MjA4MDUyNjM3M30.C-f6rCMpE-rA_IeDIYQ0CYWs5r1nPG8aijeVUEEq2Cc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const checkSubscription = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('signatures')
      .select('email')
      .eq('email', email);

    if (error) {
      console.error('Erro ao verificar assinatura:', error);
      return false;
    }
    return data && data.length > 0;
  } catch (err) {
    console.error('Erro inesperado:', err);
    return false;
  }
};

export const updateUserName = async (email: string, name: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('signatures')
      .update({ name: name })
      .eq('email', email);

    if (error) {
      console.error('Erro ao atualizar nome no banco:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Erro inesperado ao atualizar nome:', err);
    return false;
  }
};

// --- QUIZ ANALYTICS FUNCTIONS ---

export const initQuizSession = async (): Promise<string | null> => {
  try {
    // Tenta autenticar anonimamente se não houver sessão, para satisfazer regras de RLS
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) {
            console.warn('Falha no login anônimo (pode causar erro de RLS):', authError.message);
        }
    }

    // Recupera UTMs do localStorage
    const savedUtms = localStorage.getItem('lumina_utms');
    let utmData = { source: 'Direto / Orgânico', medium: null, campaign: null };
    
    if (savedUtms) {
      const parsed = JSON.parse(savedUtms);
      utmData = {
        source: parsed.source || 'Direto / Orgânico',
        medium: parsed.medium,
        campaign: parsed.campaign
      };
    }

    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert([
        { 
          utm_source: utmData.source,
          utm_medium: utmData.medium,
          utm_campaign: utmData.campaign,
          device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          status: 'started' // Explicit status
        }
      ])
      .select('id')
      .single();

    if (error) {
      // Log detalhado para debug
      console.error('Erro ao criar sessão do quiz:', JSON.stringify(error, null, 2));
      return null;
    }
    return data.id;
  } catch (err) {
    console.error('Erro inesperado ao criar sessão:', err);
    return null;
  }
};

export const saveQuizAnswer = async (sessionId: string, questionId: number, questionText: string, answerText: string) => {
  // Safety check: Don't try to save if session failed to init
  if (!sessionId) return;

  try {
    const { error } = await supabase
      .from('quiz_answers')
      .insert([
        {
          session_id: sessionId,
          question_id: questionId,
          question_text: questionText,
          answer_text: answerText
        }
      ]);

    if (error) console.error('Erro ao salvar resposta:', error);
  } catch (err) {
    console.error('Erro inesperado ao salvar resposta:', err);
  }
};

export const updateSessionStatus = async (sessionId: string, status: 'completed' | 'converted') => {
  // Safety check
  if (!sessionId) return;

  try {
    await supabase.from('quiz_sessions').update({ status }).eq('id', sessionId);
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
  }
};

// --- ADMIN DASHBOARD FUNCTIONS (CLIENT-SIDE AGGREGATION FOR ROBUSTNESS) ---

export const getAdminAnalytics = async () => {
  try {
    // 1. Fetch Sessions (Raw Data) - LIMITED to prevent browser crash on large datasets
    // In a real production app, aggregation should be done on backend (Edge Functions or RPC)
    const { data: sessions, error: sessionsError } = await supabase
        .from('quiz_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000); // SAFETY LIMIT

    if (sessionsError) throw sessionsError;

    if (!sessions || sessions.length === 0) {
        return {
            totalStarts: 0,
            trafficData: [],
            funnelData: [],
            answersData: [],
            activeNow: 0,
            avgTimeSeconds: 0
        };
    }

    // 2. Fetch Answers related to these sessions
    // Using a simpler query for MVP. For scale, use RPC.
    const { data: answers, error: answersError } = await supabase
        .from('quiz_answers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10000); // SAFETY LIMIT

    if (answersError) throw answersError;

    const totalStarts = sessions.length;

    // --- AGGREGATION LOGIC ---

    // A. Active Users (Created in last 15 mins)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeNow = sessions.filter(s => new Date(s.created_at) > fifteenMinutesAgo).length || 0;

    // B. Traffic Sources Aggregation
    const sourceMap: Record<string, number> = {};
    sessions.forEach(s => {
        const src = s.utm_source || 'Desconhecido';
        sourceMap[src] = (sourceMap[src] || 0) + 1;
    });

    const trafficData: AnalyticsTraffic[] = Object.entries(sourceMap).map(([source_name, total_leads]) => ({
        source_name,
        total_leads,
        percentage: Math.round((total_leads / totalStarts) * 100)
    })).sort((a, b) => b.total_leads - a.total_leads);

    // C. Funnel Aggregation (Unique Sessions per Question)
    const funnelMap: Record<number, Set<string>> = {};
    const answersStatsMap: Record<string, number> = {}; // key: "qId-answerText"

    answers?.forEach(a => {
        // Funnel
        if (!funnelMap[a.question_id]) funnelMap[a.question_id] = new Set();
        funnelMap[a.question_id].add(a.session_id);

        // Answers Stats
        const key = `${a.question_id}|${a.answer_text}`;
        answersStatsMap[key] = (answersStatsMap[key] || 0) + 1;
    });

    const funnelData: AnalyticsFunnel[] = Object.entries(funnelMap).map(([qId, set]) => ({
        question_id: parseInt(qId),
        total_views: set.size
    }));

    // D. Answer Stats Aggregation
    const answersData: AnalyticsAnswerStats[] = Object.entries(answersStatsMap).map(([key, count]) => {
        const [qIdStr, answer_text] = key.split('|');
        const qId = parseInt(qIdStr);
        const totalForQuestion = funnelMap[qId]?.size || 1;
        return {
            question_id: qId,
            answer_text,
            count,
            percentage: Math.round((count / totalForQuestion) * 100)
        };
    });

    // E. Average Time Calculation
    let totalDurationSeconds = 0;
    let completedCount = 0;

    const completedSessions = sessions.filter(s => s.status === 'completed' || s.status === 'converted');
    
    // Improved estimation map
    const sessionStartMap = new Map<string, number>();
    sessions.forEach(s => sessionStartMap.set(s.id, new Date(s.created_at).getTime()));

    const sessionLastInteraction = new Map<string, number>();
    answers?.forEach(a => {
        const time = new Date(a.created_at).getTime();
        const current = sessionLastInteraction.get(a.session_id) || 0;
        if (time > current) sessionLastInteraction.set(a.session_id, time);
    });

    completedSessions.forEach(s => {
        const start = sessionStartMap.get(s.id);
        const end = sessionLastInteraction.get(s.id);
        if (start && end && end > start) {
            const duration = (end - start) / 1000;
            if (duration < 7200) { // Exclude outliers > 2 hours
                totalDurationSeconds += duration;
                completedCount++;
            }
        }
    });

    const avgTimeSeconds = completedCount > 0 ? Math.round(totalDurationSeconds / completedCount) : 0;

    return {
      totalStarts,
      trafficData,
      funnelData,
      answersData,
      activeNow, 
      avgTimeSeconds 
    };

  } catch (err) {
    console.error("Erro ao buscar analytics:", err);
    return null;
  }
};
