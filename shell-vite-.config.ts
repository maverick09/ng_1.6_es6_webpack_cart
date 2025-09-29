import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    federation({
      name: 'shell',
      exposes: {
        // Shell exposes its mock context to Remote apps
        './MockContext': './src/mock-context-provider.ts',
      },
      remotes: {
        'remote-app': {
          type: 'module',
          name: 'remote_app',
          entry: 'http://localhost:9000/remoteEntry.js',
          entryGlobalName: 'remote_app',
          shareScope: 'default',
        },
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '19.0.0-rc-fb9a90fa48-20240614',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '19.0.0-rc-fb9a90fa48-20240614',
          eager: true,
        },
        '@shared/mocks': {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
  server: {
    port: 8080,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      '@shared/mocks': 'libs/shared/src/mocks',
    },
  },
});
