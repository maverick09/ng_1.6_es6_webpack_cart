npm install @module-federation/vite @module-federation/enhanced



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        // Define remotes here, or load them dynamically at runtime
        // For dynamic loading, leave this empty or use runtime API
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-router-dom': {
          singleton: true,
        },
      },
      runtimePlugins: ['./src/mf-runtime-config.ts'],
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});


