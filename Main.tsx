import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeShellMockContext } from './mock-context-provider';
import './index.css';

/**
 * ENTERPRISE SOLUTION: Shell Initializes Shared Mock Context
 * 
 * Shell app (port 8080) creates and exposes a shared mock context that
 * Remote apps (port 9000) can import via Module Federation.
 * 
 * This SOLVES the MSW cross-origin limitation by bypassing service workers
 * entirely and using a shared function-based mock system.
 */
const initializeSharedMocking = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'development') {
    console.log('🚀 Production mode - Shared mock context disabled');
    return;
  }

  console.log('🔧 Shell (8080): Initializing shared mock context...');
  
  try {
    // Initialize the shared mock context
    const mockContext = initializeShellMockContext();
    
    console.log('✅ Shell: Shared mock context initialized');
    console.log('🌐 Context will handle API calls for both Shell and Remote apps');
    console.log('🔗 Remote app will import this context via Module Federation');
    console.log('🎯 Benefits: Shared state, consistent responses, zero duplication');
    
    // Test the context
    const config = await mockContext.getShellConfig();
    console.log('🧪 Context test successful:', config.mockPattern);
    
  } catch (error) {
    console.error('❌ Failed to initialize shared mock context:', error);
    console.error('🚨 Shell will continue without mocking');
  }
};

// Get root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Shell app initializes the shared mock context
initializeSharedMocking()
  .then(() => {
    console.log('🎬 Rendering Shell Application with Shared Mock Context...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('💥 Failed to initialize Shell application:', error);
    root.render(
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        color: 'red',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>🚨 Shell Application Error</h1>
        <p>Failed to initialize Shell with shared mock context.</p>
        <pre style={{ textAlign: 'left', background: '#f5f5f5', padding: '1rem' }}>
          {error.message}
        </pre>
      </div>
    );
  });
