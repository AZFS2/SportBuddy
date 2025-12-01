import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for GitHub Pages
  server: {
    host: true, // Needed for some environments
  },
  define: {
    // Polyfill for process if some libraries use it
    'process.env': {} 
  }
});