/**
 * Shell exposes its mock context to Remote apps via Module Federation
 * This is the SOLUTION to cross-port MSW limitations
 */

import { createSharedMockContext, type MockContext } from '@shared/mocks/mock-context';

let shellMockContext: MockContext | null = null;

export const initializeShellMockContext = (): MockContext => {
  if (shellMockContext) {
    console.log('🔄 Returning existing Shell mock context');
    return shellMockContext;
  }

  console.log('🏗️ Shell: Creating shared mock context for micro-frontends');
  console.log('📍 This will handle API calls for Shell (8080) and Remote (9000)');

  shellMockContext = createSharedMockContext({
    enableLogging: true,
    networkDelay: { min: 100, max: 400 },
    errorSimulation: { enabled: false, rate: 0.05 },
  });

  console.log('✅ Shell mock context created and ready for sharing');
  console.log('🔗 Remote apps can now import this context via Module Federation');

  return shellMockContext;
};

export const getShellMockContext = (): MockContext | null => {
  return shellMockContext;
};

// Export for Remote apps to import
export type { MockContext };
