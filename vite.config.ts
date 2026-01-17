import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Using '.' as the environment directory to avoid TypeScript error with process.cwd()
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Vital para garantir que process.env.API_KEY funcione no código do cliente após o build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});