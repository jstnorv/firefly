import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base path for GitHub Pages deployment
export default defineConfig({
  base: '/firefly/',
  plugins: [react()],
});
