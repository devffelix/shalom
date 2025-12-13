
import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas
const SUPABASE_URL = 'https://kptdnvwzyotmexgmwovb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdGRudnd6eW90bWV4Z213b3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTAzNzMsImV4cCI6MjA4MDUyNjM3M30.C-f6rCMpE-rA_IeDIYQ0CYWs5r1nPG8aijeVUEEq2Cc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const checkSubscription = async (email: string): Promise<boolean> => {
  try {
    // Consulta a tabela 'signatures' procurando pelo email
    const { data, error } = await supabase
      .from('signatures')
      .select('email')
      .eq('email', email);

    if (error) {
      console.error('Erro ao verificar assinatura:', error);
      return false;
    }

    // Se retornou algum dado, significa que o email existe na tabela
    return data && data.length > 0;
  } catch (err) {
    console.error('Erro inesperado:', err);
    return false;
  }
};
