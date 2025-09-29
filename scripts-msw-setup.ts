import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Setting up MSW for Enterprise Shared Mock Context Pattern...');

// Create public directories
const publicDirs: string[] = [
  path.join(__dirname, '..', 'apps', 'shell', 'public'),
  path.join(__dirname, '..', 'apps', 'remote-app', 'public'),
];

const createDirectoryIfNotExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
};

publicDirs.forEach(createDirectoryIfNotExists);

// Create enhanced MSW service worker for enterprise pattern
const serviceWorkerContent: string = `
/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.3.0) - Enterprise Shared Context Pattern
 * @see https://github.com/mswjs/msw
 * 
 * NOTE: This service worker is primarily for fallback scenarios.
 * The main mocking is handled by the Shared Mock Context Pattern
 * which bypasses service worker limitations entirely.
 */

const INTEGRITY_CHECKSUM = '3d6b9f06410d179a7f7404d4bf4c3c70'
const activeClientIds = new Set()

const enterpriseLog = (message: string, data?: any): void => {
  console.log('[MSW Enterprise Fallback]', message, data || '');
};

self.addEventListener('install', function () {
  enterpriseLog('Installing service worker (fallback mode)');
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  enterpriseLog('Activating service worker (fallback mode)');
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !self.registration) {
    return
  }

  const client = await self.clients.get(clientId)

  if (!client) {
    return
  }

  switch (event.data.type) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)
      enterpriseLog('Client activated (fallback)', { clientId, totalClients: activeClientIds.size });

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      enterpriseLog('Client deactivated (fallback)', { clientId, totalClients: activeClientIds.size });
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)
      enterpriseLog('Client closed (fallback)', { clientId, totalClients: activeClientIds.size });
      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event
  const accept = request.headers.get('accept') || ''

  // Bypass server-sent events
  if (accept.includes('text/event-stream')) {
    return
  }

  // Bypass navigation requests
  if (request.mode === 'navigate') {
    return
  }

  // Bypass cache-only requests
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  // Log API requests for debugging
  if (request.url.includes('/api/')) {
    enterpriseLog('API request detected (fallback mode)', {
      method: request.method,
      url: request.url,
      note: 'Consider using Shared Mock Context instead'
    });
  }

  // For now, just passthrough - main mocking is via Shared Context
  return
})

const sendToClient = (client: any, message: any): Promise<void> => client.postMessage(message);
`;

const writeServiceWorkerFile = (dir: string): void => {
  const swPath = path.join(dir, 'mockServiceWorker.js');
  fs.writeFileSync(swPath, serviceWorkerContent);
  console.log(`✅ Created MSW service worker (fallback): ${swPath}`);
};

publicDirs.forEach(writeServiceWorkerFile);

// Success message
const logSuccessMessage = (): void => {
  console.log('🎉 MSW setup completed!');
  console.log('📝 Key Features:');
  console.log('  • Service worker created for fallback scenarios');
  console.log('  • Primary mocking via Shared Mock Context Pattern');
  console.log('  • Shell (8080) creates context, Remote (9000) imports it');
  console.log('  • Bypasses MSW cross-origin limitations completely');
  console.log('');
  console.log('🚀 Next Steps:');
  console.log('  1. npm run build:shared  # Build shared library');
  console.log('  2. npm run dev          # Start both applications');
  console.log('  3. Test shared state between ports 8080 and 9000');
};

logSuccessMessage();
