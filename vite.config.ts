import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Usa REACT_APP_GOOGLE_API_KEY como padrão (consistente com o projeto)
      'process.env.REACT_APP_GOOGLE_API_KEY': JSON.stringify(
        env.REACT_APP_GOOGLE_API_KEY || env.VITE_GOOGLE_API_KEY || ""
      ),
      // Fallback para outras convenções
      'process.env.API_KEY': JSON.stringify(
        env.REACT_APP_GOOGLE_API_KEY || env.VITE_GOOGLE_API_KEY || env.API_KEY || ""
      ),
      // Exponha todas as variáveis de ambiente
      'process.env': JSON.stringify(env)
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'google-genai': ['@google/genai'],
            'lucide': ['lucide-react']
          }
        }
      }
    },
    server: {
      port: 5173,
      strictPort: false,
      open: true
    }
  };
});
