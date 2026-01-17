
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, Activity, Globe, Instagram, Facebook, Search, Loader2, Clock, Target, TrendingDown, MousePointer2, BarChart2, CornerDownRight } from 'lucide-react';
import { ShalomLogo } from '../components/Layout';
import { getAdminAnalytics } from '../services/supabase';
import { AnalyticsTraffic, AnalyticsAnswerStats, AnalyticsFunnel } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // States for DB Data
  const [globalStats, setGlobalStats] = useState({
    totalStarts: 0,
    completionRate: 0,
    activeNow: 0,
    dropOffAvg: 0,
    avgTime: "0s"
  });
  
  const [trafficData, setTrafficData] = useState<AnalyticsTraffic[]>([]);
  const [funnelMap, setFunnelMap] = useState<Record<number, number>>({});
  const [answersMap, setAnswersMap] = useState<Record<number, AnalyticsAnswerStats[]>>({});

  // Ícones mapeados
  const getIconForSource = (source: string) => {
    if (source.includes('Instagram')) return { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/20' };
    if (source.includes('Facebook')) return { icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    if (source.includes('Google')) return { icon: Search, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' };
    return { icon: Globe, color: 'text-stone-500', bg: 'bg-stone-100 dark:bg-stone-800' };
  };

  const formatSeconds = (seconds: number) => {
      if (!seconds || isNaN(seconds)) return "0s";
      if (seconds < 60) return `${seconds}s`;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}m ${s}s`;
  };

  useEffect(() => {
    const loadData = async () => {
        try {
            const data = await getAdminAnalytics();
            if (data) {
                // Process Funnel Map
                const fMap: Record<number, number> = {};
                
                data.funnelData.forEach(f => {
                    fMap[f.question_id] = f.total_views;
                });
                
                // Process Answers Map
                const aMap: Record<number, AnalyticsAnswerStats[]> = {};
                data.answersData.forEach(a => {
                    if (!aMap[a.question_id]) aMap[a.question_id] = [];
                    aMap[a.question_id].push(a);
                });

                // Calculate Completion Rate
                // Base: Q1 (Identidade) vs Target: Q17 (Oferta/Entrega)
                const q1Views = fMap[1] || 1; 
                const qTargetViews = fMap[17] || 0; // ID 17 is the Offer Page
                
                const rate = q1Views > 0 ? Math.round((qTargetViews / q1Views) * 100) : 0;
                
                // Avg Drop off (Simple estimation)
                const dropOff = 100 - rate;

                setGlobalStats({
                    totalStarts: data.totalStarts,
                    completionRate: rate,
                    dropOffAvg: dropOff,
                    activeNow: data.activeNow,
                    avgTime: formatSeconds(data.avgTimeSeconds || 0)
                });

                setTrafficData(data.trafficData);
                setFunnelMap(fMap);
                setAnswersMap(aMap);
            }
        } catch (error) {
            console.error("Erro ao processar dados do dashboard:", error);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, []);

  // Definição EXATA das Perguntas baseada no Quiz.tsx
  const questionsStructure = [
    { id: 1, question: 'Identidade (Gênero)', type: 'choice' },
    { id: 2, question: 'Nome do Usuário', type: 'text' },
    { id: 3, question: 'Contexto Espiritual (Carta de Boas-vindas)', type: 'info' },
    { id: 4, question: 'Como sente sua fé hoje?', type: 'choice' },
    { id: 5, question: 'Frequência de Oração', type: 'choice' },
    { id: 6, question: 'Clareza ao ouvir Deus', type: 'choice' },
    { id: 7, question: 'Conhecimento Bíblico (Medo)', type: 'choice' },
    { id: 8, question: 'Rotina de Leitura Bíblica', type: 'choice' },
    { id: 9, question: 'Sentimento de Solidão Espiritual', type: 'choice' },
    { id: 10, question: 'Apoio Emocional (Tristeza)', type: 'choice' },
    { id: 11, question: 'Importância de viver perto de Deus', type: 'choice' },
    { id: 12, question: 'Maior Obstáculo', type: 'choice' },
    { id: 13, question: 'Área de Necessidade (Dor Principal)', type: 'choice' },
    { id: 14, question: 'Impacto de 10 min diários', type: 'choice' },
    { id: 15, question: 'Compromisso de 14 dias', type: 'choice' },
    { id: 16, question: 'Solução WhatsApp (Validação)', type: 'choice' },
    { id: 17, question: 'Entrega do Plano (Oferta)', type: 'choice' }, // Ponto de Conversão
    { id: 18, question: 'Processamento Final', type: 'final' }
  ];

  if (loading) {
      return (
          <div className="min-h-screen bg-stone-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-orange" size={40} />
                  <p className="text-stone-500 font-medium">Calculando dados reais do Reino...</p>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] dark:bg-[#0c0a09] text-ink dark:text-white font-sans selection:bg-orange/20">
      
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl z-30 border-b border-stone-200/50 dark:border-stone-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:scale-105 transition-transform text-stone-500 hover:text-ink">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-serif font-bold flex items-center gap-2 text-ink dark:text-white">
                        <ShalomLogo size="w-5 h-5" /> Analytics (Dados Reais)
                    </h1>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 text-green-600 dark:text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">{globalStats.activeNow} Online (15min)</span>
            </div>
          </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-24 px-4 md:px-6 pb-20 space-y-8">
          
          {/* KPI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Card 1: Leads */}
              <div className="bg-white dark:bg-stone-900 p-6 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Users size={60} /></div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Total de Sessões</p>
                  <div className="flex items-end gap-2">
                      <h2 className="text-4xl font-black text-ink dark:text-white tracking-tighter">{globalStats.totalStarts.toLocaleString()}</h2>
                  </div>
              </div>

              {/* Card 2: Conversion */}
              <div className="bg-white dark:bg-stone-900 p-6 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Target size={60} /></div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Taxa de Conclusão</p>
                  <div className="flex items-end gap-2">
                      <h2 className={`text-4xl font-black tracking-tighter ${globalStats.completionRate > 60 ? 'text-green-600 dark:text-green-400' : 'text-orange'}`}>{globalStats.completionRate}%</h2>
                      <span className="text-xs text-stone-400 mb-1.5 font-medium">chegaram à Oferta</span>
                  </div>
                  {/* Mini Progress Bar */}
                  <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 mt-3 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${globalStats.completionRate}%` }}></div>
                  </div>
              </div>

              {/* Card 3: Drop-off */}
              <div className="bg-white dark:bg-stone-900 p-6 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingDown size={60} /></div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Desistência Geral</p>
                  <div className="flex items-end gap-2">
                      <h2 className="text-4xl font-black text-red-500 tracking-tighter">{globalStats.dropOffAvg}%</h2>
                      <span className="text-xs text-stone-400 mb-1.5 font-medium">saíram antes do fim</span>
                  </div>
              </div>

              {/* Card 4: Avg Time (Real) */}
              <div className="bg-gradient-to-br from-gold to-orange p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20"><Clock size={60} /></div>
                  <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1">Tempo de Engajamento</p>
                  <div className="flex items-end gap-2">
                      <h2 className="text-4xl font-black tracking-tighter">{globalStats.avgTime}</h2>
                  </div>
                  <p className="text-xs text-white/90 mt-2 font-medium">Média real por usuário</p>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COL: TRAFFIC & FUNNEL VISUAL */}
              <div className="lg:col-span-1 space-y-8">
                  {/* Traffic Sources */}
                  <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-sm border border-stone-100 dark:border-stone-800">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-ink dark:text-white">
                          <MousePointer2 size={18} className="text-gold" /> Origem do Tráfego
                      </h3>
                      <div className="space-y-3">
                          {trafficData.map((src, i) => {
                              const style = getIconForSource(src.source_name);
                              return (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${style.bg} ${style.color}`}>
                                            <style.icon size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-ink dark:text-white">{src.source_name}</p>
                                            <p className="text-[10px] text-stone-400 font-mono">{src.total_leads} acessos</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-sm">{src.percentage}%</span>
                                </div>
                              )
                          })}
                          {trafficData.length === 0 && <p className="text-sm text-stone-400 text-center py-4">Aguardando dados de UTM...</p>}
                      </div>
                  </div>

                  {/* Funnel Overview Chart - Pontos Chave */}
                  <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-sm border border-stone-100 dark:border-stone-800">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-ink dark:text-white">
                          <Activity size={18} className="text-blue-500" /> Saúde do Funil
                      </h3>
                      <div className="flex items-end justify-between h-32 gap-2">
                          {[1, 5, 10, 15, 17].map((qId, idx) => {
                              const views = funnelMap[qId] || 0;
                              // Q1 is always base 100% relative to itself, or max of current set
                              const maxViews = funnelMap[1] || 1;
                              const height = Math.max((views / maxViews) * 100, 5); // min 5% height
                              
                              return (
                                  <div key={qId} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                                      <div className="text-[10px] font-bold text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-6">{views}</div>
                                      <div 
                                        className={`w-full rounded-t-lg transition-all duration-1000 ${qId === 17 ? 'bg-green-500' : 'bg-stone-200 dark:bg-stone-700 group-hover:bg-gold'}`} 
                                        style={{ height: `${height}%` }}
                                      ></div>
                                      <span className="text-[10px] font-bold text-stone-400">Q{qId}</span>
                                  </div>
                              )
                          })}
                      </div>
                  </div>
              </div>

              {/* RIGHT COL: DETAILED QUESTIONS TIMELINE */}
              <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-2xl text-ink dark:text-white">Jornada do Usuário</h3>
                      <span className="text-xs font-bold bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full text-stone-500">
                          {questionsStructure.length} Etapas Monitoradas
                      </span>
                  </div>

                  <div className="space-y-0 relative">
                      {/* Vertical Line */}
                      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-stone-200 dark:bg-stone-800 z-0"></div>

                      {questionsStructure.map((q, index) => {
                          const views = funnelMap[q.id] || 0;
                          const nextViews = funnelMap[q.id + 1] || 0;
                          
                          // Metric Correction: "Lost" is now specifically "Visited but no Interaction"
                          const answers = answersMap[q.id] || [];
                          const totalAnswers = answers.reduce((acc, curr) => acc + curr.count, 0);
                          
                          // If there are interaction records, they are not lost for this specific step logic
                          const unengagedCount = Math.max(0, views - totalAnswers);
                          const dropOffPercent = views > 0 ? Math.round((unengagedCount / views) * 100) : 0;
                          
                          // Retention bar still shows flow to next step for visual continuity
                          const flowRetentionPercent = views > 0 ? Math.round((nextViews / views) * 100) : 0;
                          
                          const isLast = index === questionsStructure.length - 1;

                          return (
                            <div key={q.id} className="relative z-10 pl-16 pb-8 group">
                                {/* Timeline Node */}
                                <div className={`absolute left-0 w-12 h-12 rounded-2xl border-4 border-[#F5F5F4] dark:border-[#0c0a09] flex items-center justify-center font-black text-sm z-20 ${isLast ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-white dark:bg-stone-800 text-stone-400 shadow-sm'}`}>
                                    {q.id}
                                </div>

                                {/* Question Card */}
                                <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-shadow relative overflow-hidden">
                                    {/* Retention Bar Background (Flow Logic) */}
                                    {!isLast && (
                                        <div className="absolute top-0 left-0 h-1 bg-stone-100 w-full">
                                            <div className="h-full bg-gradient-to-r from-green-400 to-green-500" style={{ width: `${flowRetentionPercent}%` }}></div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-serif font-bold text-lg text-ink dark:text-white leading-tight max-w-lg mb-2">
                                                {q.question}
                                            </h4>
                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-bold bg-stone-50 dark:bg-stone-800 px-2 py-1 rounded-md">
                                                    <Users size={12} /> {views.toLocaleString()} Visitas
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/10 px-2 py-1 rounded-md">
                                                    <Activity size={12} /> {totalAnswers.toLocaleString()} Interações
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {!isLast && (
                                            <div className="flex flex-col items-end">
                                                <div className={`flex items-center gap-1 font-black text-lg ${dropOffPercent > 50 ? 'text-red-500' : 'text-stone-400'}`}>
                                                    <TrendingDown size={16} /> {dropOffPercent}%
                                                </div>
                                                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Perdidos</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Answers Visualizer */}
                                    <div className="space-y-3 mt-4">
                                        {q.type === 'choice' || q.type === 'info' ? (
                                            answers.length > 0 ? (
                                                answers.map((opt, i) => (
                                                    <div key={i} className="relative h-10 rounded-xl bg-stone-50 dark:bg-stone-800/50 overflow-hidden flex items-center px-4 group/opt">
                                                        <div 
                                                            className={`absolute top-0 left-0 h-full opacity-20 transition-all duration-1000 ${i === 0 ? 'bg-gold' : 'bg-stone-400'}`} 
                                                            style={{ width: `${opt.percentage}%` }}
                                                        ></div>
                                                        <div className="relative z-10 w-full flex justify-between items-center text-sm">
                                                            <span className={`font-bold ${i === 0 ? 'text-ink dark:text-white' : 'text-stone-500'}`}>{opt.answer_text}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-stone-400">({opt.count})</span>
                                                                <span className="font-black">{opt.percentage}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-2 text-xs text-stone-400 italic bg-stone-50 dark:bg-stone-800/30 rounded-xl">Sem dados ainda...</div>
                                            )
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-50 dark:bg-stone-800/30 p-3 rounded-xl border border-dashed border-stone-200 dark:border-stone-700">
                                                <Activity size={16} /> Campo de texto livre (Dados qualitativos)
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Metrics - Drop off Explanation */}
                                    {!isLast && (
                                        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-2 text-stone-400">
                                                <CornerDownRight size={12} />
                                                <span>{nextViews} avançaram para a próxima</span>
                                            </div>
                                            {unengagedCount > 0 && (
                                                <div className="text-red-400 font-bold bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded">
                                                    -{unengagedCount} sem interagir
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                          )
                      })}
                  </div>
              </div>
          </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
