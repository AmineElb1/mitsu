import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      /* twee pagina's: de site en de adminpagina voor de aanvragen */
      input: {
        main: 'index.html',
        admin: 'admin.html'
      },
      output: {
        manualChunks: {
          motion: ['gsap', 'lenis'],
          react: ['react', 'react-dom']
        }
      }
    }
  }
});
