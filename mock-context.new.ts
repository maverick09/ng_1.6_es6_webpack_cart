/**
 * ENTERPRISE SOLUTION: MSW-Powered Shared Mock Context
 * 
 * This creates a shared mock context that uses MSW internally but exposes
 * a clean function-based API. This combines MSW's powerful features with
 * the cross-origin compatibility of shared functions via Module Federation.
 */

import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import type { MockConfig, MockContext, CartItem, User } from '../types';
import { mockData } from './data';
import { generateRandomId, logMockRequest, addRandomVariation } from './utils';

// Global shared state - managed by Shell, accessible by all apps
interface GlobalMockState {
  cartItems: CartItem[];
  authToken: string | null;
  user: User | null;
  requestCount: number;
  isInitialized: boolean;
  mswWorker: ReturnType<typeof setupWorker> | null;
}

let globalMockState: GlobalMockState = {
  cartItems: [],
  authToken: null,
  user: null,
  requestCount: 0,
  isInitialized: false,
  mswWorker: null,
};

let currentConfig: MockConfig = {
  enableLogging: true,
  networkDelay: { min: 100, max: 500 },
  errorSimulation: { enabled: false, rate: 0.05 },
};

/**
 * Create MSW handlers that work with the shared state
 */
const createMSWHandlers = (config: MockConfig) => [
  // Shell endpoints
  http.get('/api/shell/config', async () => {
    globalMockState.requestCount++;
    logMockRequest('GET', '/api/shell/config', 'Via MSW in Shared Context');
    
    return HttpResponse.json({
      ...mockData.shellConfig,
      buildTime: new Date().toISOString(),
      requestCount: globalMockState.requestCount,
      mockType: 'MSW-Powered Shared Context',
    });
  }),

  http.get('/api/shell/user', async ({ request }) => {
    globalMockState.requestCount++;
    const url = new URL(request.url);
    const detailed = url.searchParams.get('detailed') === 'true';
    
    logMockRequest('GET', '/api/shell/user', { detailed, hasAuth: !!globalMockState.authToken });
    
    if (!globalMockState.authToken) {
      return HttpResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    return HttpResponse.json(
      detailed 
        ? { ...mockData.user, analytics: mockData.analytics }
        : mockData.user
    );
  }),

  http.patch('/api/shell/user/preferences', async ({ request }) => {
    globalMockState.requestCount++;
    const preferences = await request.json();
    
    logMockRequest('PATCH', '/api/shell/user/preferences', preferences);
    
    return HttpResponse.json({
      success: true,
      message: 'Preferences updated via MSW shared context',
      updatedPreferences: { ...mockData.user.preferences, ...preferences },
      mockType: 'MSW-Powered',
    });
  }),

  http.get('/api/shell/analytics', async () => {
    globalMockState.requestCount++;
    
    const analytics = {
      ...mockData.analytics,
      pageViews: addRandomVariation(mockData.analytics.pageViews, 0.05),
      realTime: {
        ...mockData.analytics.realTime,
        activeUsers: Math.floor(Math.random() * 50) + 10,
        lastUpdate: new Date().toISOString(),
      },
    };
    
    logMockRequest('GET', '/api/shell/analytics', 'Real-time data via MSW');
    
    return HttpResponse.json(analytics);
  }),

  http.get('/api/shell/notifications', async () => {
    globalMockState.requestCount++;
    logMockRequest('GET', '/api/shell/notifications', `${mockData.notifications.length} notifications`);
    
    return HttpResponse.json(mockData.notifications);
  }),

  http.get('/api/shell/health', async () => {
    globalMockState.requestCount++;
    
    const health = {
      status: 'healthy' as const,
      service: 'shell-app',
      port: 8080,
      version: mockData.shellConfig.version,
      mockContext: {
        active: true,
        type: 'MSW-Powered Shared Context',
        pattern: 'MSW + Function API',
        requestsHandled: globalMockState.requestCount,
        sharedState: {
          cartItems: globalMockState.cartItems.length,
          authenticated: !!globalMockState.authToken,
        },
      },
      connectedApps: ['shell-8080', 'remote-9000'],
      timestamp: new Date().toISOString(),
    };
    
    logMockRequest('GET', '/api/shell/health', 'Health via MSW');
    
    return HttpResponse.json(health);
  }),

  // Remote endpoints
  http.get('/api/remote/config', async () => {
    globalMockState.requestCount++;
    logMockRequest('GET', '/api/remote/config', 'Via MSW Shared Context');
    
    return HttpResponse.json({
      ...mockData.remoteConfig,
      buildTime: new Date().toISOString(),
      mockContext: {
        active: true,
        type: 'MSW-Powered',
        sharedWithShell: true,
        cartItems: globalMockState.cartItems.length,
        authenticated: !!globalMockState.authToken,
      },
      ports: { shell: 8080, remote: 9000 },
    });
  }),

  http.get('/api/remote/products', async ({ request }) => {
    globalMockState.requestCount++;
    
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const inStockOnly = url.searchParams.get('inStock') === 'true';
    
    let products = [...mockData.products];
    
    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (inStockOnly) {
      products = products.filter(p => p.inStock);
    }
    
    logMockRequest('GET', '/api/remote/products', { 
      category, search, inStockOnly, count: products.length, mockType: 'MSW'
    });
    
    return HttpResponse.json(products);
  }),

  http.get('/api/remote/dashboard', async () => {
    globalMockState.requestCount++;
    
    const dashboard = {
      ...mockData.dashboardData,
      stats: {
        ...mockData.dashboardData.stats,
        totalRevenue: addRandomVariation(mockData.dashboardData.stats.totalRevenue, 0.02),
      },
      contextInfo: {
        requestsHandled: globalMockState.requestCount,
        sharedCartItems: globalMockState.cartItems.length,
        authenticated: !!globalMockState.authToken,
        pattern: 'MSW-Powered Shared Context',
      },
    };
    
    logMockRequest('GET', '/api/remote/dashboard', 'Dashboard via MSW');
    
    return HttpResponse.json(dashboard);
  }),

  // Cart endpoints - using shared state
  http.get('/api/remote/cart', async () => {
    globalMockState.requestCount++;
    
    const cartWithProducts = globalMockState.cartItems.map(item => {
      const product = mockData.products.find(p => p.id === item.productId);
      return {
        ...item,
        product,
        total: product ? product.price * item.quantity : 0,
      };
    });
    
    const cart = {
      items: cartWithProducts,
      total: cartWithProducts.reduce((sum, item) => sum + item.total, 0),
      itemCount: globalMockState.cartItems.reduce((sum, item) => sum + item.quantity, 0),
      isSharedContext: true,
      managedBy: 'MSW Shared Context',
    };
    
    logMockRequest('GET', '/api/remote/cart', { 
      itemCount: cart.itemCount, sharedBetweenApps: true, mockType: 'MSW'
    });
    
    return HttpResponse.json(cart);
  }),

  http.post('/api/remote/cart', async ({ request }) => {
    globalMockState.requestCount++;
    
    const { productId, quantity } = await request.json() as { productId: number; quantity: number };
    
    // Update shared state
    const existingItem = globalMockState.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      globalMockState.cartItems.push({ productId, quantity });
    }
    
    const totalItems = globalMockState.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    logMockRequest('POST', '/api/remote/cart', { 
      productId, quantity, totalItems, 
      note: 'Added to MSW shared context - visible across Shell & Remote!',
      mockType: 'MSW'
    });
    
    return HttpResponse.json({
      success: true,
      message: 'Item added to MSW shared context (visible in both Shell and Remote)',
      cartItemCount: totalItems,
      isSharedContext: true,
      mockType: 'MSW-Powered',
    });
  }),

  http.delete('/api/remote/cart/:productId', async ({ params }) => {
    globalMockState.requestCount++;
    
    const productId = parseInt(params.productId as string);
    globalMockState.cartItems = globalMockState.cartItems.filter(item => item.productId !== productId);
    
    logMockRequest('DELETE', `/api/remote/cart/${productId}`, 'Removed from MSW shared context');
    
    return HttpResponse.json({
      success: true,
      message: 'Item removed from MSW shared context',
      isSharedContext: true,
      mockType: 'MSW-Powered',
    });
  }),

  // Authentication endpoints - shared state
  http.post('/api/auth/login', async ({ request }) => {
    globalMockState.requestCount++;
    
    const { email, password } = await request.json() as { email: string; password: string };
    
    logMockRequest('POST', '/api/auth/login', { email, mockType: 'MSW' });
    
    if (email === 'john.doe@company.com' && password === 'password') {
      globalMockState.authToken = `msw-context-token-${generateRandomId()}`;
      globalMockState.user = mockData.user;
      
      return HttpResponse.json({
        success: true,
        user: mockData.user,
        token: globalMockState.authToken,
        expiresIn: 3600,
        message: 'Authenticated via MSW shared context - valid for Shell & Remote',
        context: 'MSW-Powered Shared Context',
      });
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post('/api/auth/logout', async () => {
    globalMockState.requestCount++;
    
    globalMockState.authToken = null;
    globalMockState.user = null;
    
    logMockRequest('POST', '/api/auth/logout', 'Global logout via MSW');
    
    return HttpResponse.json({ 
      success: true, 
      message: 'Logged out from MSW shared context - affects all micro-frontends',
      mockType: 'MSW-Powered',
    });
  }),

  // Health check
  http.get('/health', async () => {
    globalMockState.requestCount++;
    
    const health = {
      status: 'healthy' as const,
      service: 'remote-app',
      port: 9000,
      version: mockData.remoteConfig.version,
      mockContext: {
        active: true,
        type: 'MSW-Powered Shared Context',
        pattern: 'MSW + Function API',
        connectedToShell: true,
        requestsHandled: globalMockState.requestCount,
      },
      sharedState: {
        cartItems: globalMockState.cartItems.length,
        authenticated: !!globalMockState.authToken,
      },
      timestamp: new Date().toISOString(),
    };
    
    logMockRequest('GET', '/health', 'Remote health via MSW');
    
    return HttpResponse.json(health);
  }),
];

/**
 * Creates the MSW-powered shared mock context - called ONLY by Shell app
 */
export const createSharedMockContext = async (config?: MockConfig): Promise<MockContext> => {
  if (config) {
    currentConfig = { ...currentConfig, ...config };
  }
  
  console.log('🏗️ Creating MSW-powered shared mock context');
  console.log('📍 MSW handles requests internally, functions provide cross-port API');
  console.log('🎯 Best of both worlds: MSW features + cross-origin compatibility');
  
  // Initialize MSW worker
  const handlers = createMSWHandlers(currentConfig);
  const worker = setupWorker(...handlers);
  
  // Configure MSW worker
  if (currentConfig.enableLogging) {
    worker.events.on('request:start', ({ request }) => {
      console.log('🌐 MSW [Shared Context] intercepted:', request.method, request.url);
    });

    worker.events.on('response:mocked', ({ request, response }) => {
      console.log('📤 MSW [Shared Context] mocked:', request.method, request.url, response.status);
    });
  }
  
  // Start MSW worker
  await worker.start({
    onUnhandledRequest: 'bypass',
    quiet: !currentConfig.enableLogging,
    serviceWorker: {
      url: '/mockServiceWorker.js',
      options: {
        scope: '/',
      },
    },
  });
  
  globalMockState.mswWorker = worker;
  globalMockState.isInitialized = true;
  
  console.log('✅ MSW worker started and shared context created');
  console.log('🔗 Function API ready for Module Federation sharing');
  
  // Create function-based API that uses MSW behind the scenes
  const context: MockContext = {
    // Function API that calls MSW endpoints internally
    getShellConfig: async () => {
      const response = await fetch('/api/shell/config');
      return response.json();
    },

    getUser: async (detailed = false) => {
      const url = detailed ? '/api/shell/user?detailed=true' : '/api/shell/user';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Authentication required');
      }
      return response.json();
    },

    updateUserPreferences: async (preferences) => {
      const response = await fetch('/api/shell/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      return response.json();
    },

    getAnalytics: async () => {
      const response = await fetch('/api/shell/analytics');
      return response.json();
    },

    getNotifications: async () => {
      const response = await fetch('/api/shell/notifications');
      return response.json();
    },

    getShellHealth: async () => {
      const response = await fetch('/api/shell/health');
      return response.json();
    },

    // Remote API functions that call MSW endpoints
    getRemoteConfig: async () => {
      const response = await fetch('/api/remote/config');
      return response.json();
    },

    getProducts: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      if (filters.inStockOnly) params.set('inStock', 'true');
      
      const url = `/api/remote/products${params.toString() ? `?${params}` : ''}`;
      const response = await fetch(url);
      return response.json();
    },

    getDashboard: async () => {
      const response = await fetch('/api/remote/dashboard');
      return response.json();
    },

    getCart: async () => {
      const response = await fetch('/api/remote/cart');
      return response.json();
    },

    addToCart: async (productId, quantity) => {
      const response = await fetch('/api/remote/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      return response.json();
    },

    removeFromCart: async (productId) => {
      const response = await fetch(`/api/remote/cart/${productId}`, {
        method: 'DELETE',
      });
      return response.json();
    },

    getRemoteHealth: async () => {
      const response = await fetch('/health');
      return response.json();
    },

    // Authentication functions that call MSW endpoints
    login: async (email, password) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      return response.json();
    },

    logout: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      return response.json();
    },

    getSharedConfig: async () => {
      return {
        mockContextInfo: {
          pattern: 'MSW-Powered Shared Context',
          type: 'MSW + Function API',
          isActive: globalMockState.isInitialized,
          totalRequests: globalMockState.requestCount,
          managedBy: 'Shell App (8080)',
          consumedBy: ['Shell (8080)', 'Remote (9000)'],
        },
        globalState: {
          cartItems: globalMockState.cartItems.length,
          authenticated: !!globalMockState.authToken,
        },
        features: {
          sharedState: true,
          crossAppCommunication: true,
          singleSourceOfTruth: true,
          bypassesServiceWorkerLimitations: true,
          mswPowered: true,
          functionBasedAPI: true,
        },
        ports: { shell: 8080, remote: 9000 },
        timestamp: new Date().toISOString(),
      };
    },

    getGlobalState: async () => {
      const cartValue = globalMockState.cartItems.reduce((sum, item) => {
        const product = mockData.products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);

      return {
        ...globalMockState,
        cartValue,
        mswWorkerActive: !!globalMockState.mswWorker,
        mockType: 'MSW-Powered Shared Context',
      };
    },

    // Direct state access (bypasses MSW for performance)
    getState: () => ({ ...globalMockState }),
    
    setState: (updates) => {
      globalMockState = { ...globalMockState, ...updates };
      logMockRequest('STATE', 'Global state updated directly', updates);
    },

    // Configuration functions
    isActive: () => globalMockState.isInitialized,
    
    getConfig: () => ({ ...currentConfig }),
    
    updateConfig: (configUpdates) => {
      currentConfig = { ...currentConfig, ...configUpdates };
      
      // Recreate MSW handlers with new config
      if (globalMockState.mswWorker) {
        const newHandlers = createMSWHandlers(currentConfig);
        globalMockState.mswWorker.resetHandlers(...newHandlers);
      }
      
      logMockRequest('CONFIG', 'MSW config updated', configUpdates);
    },
  };

  // Store globally for debugging
  if (typeof window !== 'undefined') {
    (window as any).__SHARED_MOCK_CONTEXT__ = context;
    (window as any).__SHARED_MOCK_STATE__ = globalMockState;
    (window as any).__MSW_WORKER__ = worker;
  }

  console.log('✅ MSW-powered shared context ready');
  console.log('🎭 MSW handles mocking, functions provide cross-port API');

  return context;
};

/**
 * Gets the existing shared mock context - used by Remote apps
 */
export const getSharedMockContext = (): MockContext | null => {
  if (typeof window !== 'undefined') {
    return (window as any).__SHARED_MOCK_CONTEXT__ || null;
  }
  return null;
};...item,
          product,
          total: product ? product.price * item.quantity : 0,
        };
      });
      
      const cart = {
        items: cartWithProducts,
        total: cartWithProducts.reduce((sum, item) => sum + item.total, 0),
        itemCount: globalMockState.cartItems.reduce((sum, item) => sum + item.quantity, 0),
        isSharedContext: true,
        managedBy: 'Pure Function Context (No MSW)',
      };
      
      logMockRequest('GET', '/api/remote/cart', { 
        itemCount: cart.itemCount,
        sharedBetweenApps: true,
        mockType: 'Pure Functions'
      });
      
      return cart;
    },

    addToCart: async (productId, quantity) => {
      await simulateNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      // Pure JavaScript state update - no MSW!
      const existingItem = globalMockState.cartItems.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        globalMockState.cartItems.push({ productId, quantity });
      }
      
      const totalItems = globalMockState.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      logMockRequest('POST', '/api/remote/cart', { 
        productId, 
        quantity, 
        totalItems,
        note: 'Added to SHARED pure function context - visible across Shell & Remote!',
        mockType: 'Pure Functions'
      });
      
      return {
        success: true,
        message: 'Item added to shared pure function context (visible in both Shell and Remote)',
        cartItemCount: totalItems,
        isSharedContext: true,
        mockType: 'Pure Function-Based (No MSW)',
      };
    },

    removeFromCart: async (productId) => {
      await simulateNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      // Pure JavaScript array filtering - no MSW!
      globalMockState.cartItems = globalMockState.cartItems.filter(item => item.productId !== productId);
      
      logMockRequest('DELETE', `/api/remote/cart/${productId}`, 'Removed from pure function context');
      
      return {
        success: true,
        message: 'Item removed from shared pure function context',
        isSharedContext: true,
        mockType: 'Pure Function-Based (No MSW)',
      };
    },

    getRemoteHealth: async () => {
      await simulateNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      const health = {
        status: 'healthy' as const,
        service: 'remote-app',
        port: 9000,
        version: mockData.remoteConfig.version,
        mockContext: {
          active: true,
          type: 'Pure Function-Based Context',
          pattern: 'Shared Functions via Shell (No MSW)',
          connectedToShell: true,
          requestsHandled: globalMockState.requestCount,
        },
        sharedState: {
          cartItems: globalMockState.cartItems.length,
          authenticated: !!globalMockState.authToken,
        },
        timestamp: new Date().toISOString(),
      };
      
      logMockRequest('GET', '/health', 'Remote health via pure functions');
      
      return health;
    },

    // Shared authentication - Pure JavaScript, affects both apps
    login: async (email, password) => {
      await simulateNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('POST', '/api/auth/login', { email, mockType: 'Pure Functions' });
      
      // Pure JavaScript authentication logic - no MSW!
      if (email === 'john.doe@company.com' && password === 'password') {
        globalMockState.authToken = `pure-context-token-${generateRandomId()}`;
        globalMockState.user = mockData.user;
        
        return {
          success: true,
          user: mockData.user,
          token: globalMockState.authToken,
          expiresIn: 3600,
          message: 'Authenticated via pure function context - valid for Shell & Remote',
          context: 'Shared between all micro-frontends (No MSW)',
          mockType: 'Pure Function-Based',
        };
      }
      
      throw new Error('Invalid credentials');
    },

    logout: async () => {
      await simulateNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      // Pure JavaScript state reset - no MSW!
      globalMockState.authToken = null;
      globalMockState.user = null;
      
      logMockRequest('POST', '/api/auth/logout', 'Global logout via pure functions');
      
      return { 
        success: true, 
        message: 'Logged out from pure function context - affects all micro-frontends',
        mockType: 'Pure Function-Based (No MSW)',
      };
    },

    getSharedConfig: async () => {
      await simulateNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      return {
        mockContextInfo: {
          pattern: 'Pure Function-Based Shared Context',
          type: 'No MSW - Pure JavaScript Functions',
          isActive: globalMockState.isInitialized,
          totalRequests: globalMockState.requestCount,
          managedBy: 'Shell App (8080)',
          consumedBy: ['Shell (8080)', 'Remote (9000)'],
        },
        globalState: {
          cartItems: globalMockState.cartItems.length,
          authenticated: !!globalMockState.authToken,
        },
        features: {
          sharedState: true,
          crossAppCommunication: true,
          singleSourceOfTruth: true,
          bypassesServiceWorkerLimitations: true,
          noMSW: true,
          pureFunctionBased: true,
        },
        ports: { shell: 8080, remote: 9000 },
        timestamp: new Date().toISOString(),
      };
    },

    getGlobalState: async () => {
      // Pure JavaScript calculation - no MSW!
      const cartValue = globalMockState.cartItems.reduce((sum, item) => {
        const product = mockData.products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);

      return {
        ...globalMockState,
        cartValue,
        mockType: 'Pure Function-Based (No MSW)',
      };
    },

    // State management functions - Pure JavaScript
    getState: () => ({ ...globalMockState }),
    
    setState: (updates) => {
      globalMockState = { ...globalMockState, ...updates };
      logMockRequest('STATE', 'Global state updated via pure functions', updates);
    },

    // Configuration functions - Pure JavaScript
    isActive: () => globalMockState.isInitialized,
    
    getConfig: () => ({ ...currentConfig }),
    
    updateConfig: (configUpdates) => {
      currentConfig = { ...currentConfig, ...configUpdates };
      logMockRequest('CONFIG', 'Mock config updated via pure functions', configUpdates);
    },
  };

  // Store globally for debugging
  if (typeof window !== 'undefined') {
    (window as any).__SHARED_MOCK_CONTEXT__ = context;
    (window as any).__SHARED_MOCK_STATE__ = globalMockState;
  }

  console.log('✅ Pure function-based mock context created');
  console.log('🚫 NO MSW dependencies - completely independent');

  return context;
};

/**
 * Gets the existing shared mock context - used by Remote apps
 */
export const getSharedMockContext = (): MockContext | null => {
  if (typeof window !== 'undefined') {
    return (window as any).__SHARED_MOCK_CONTEXT__ || null;
  }
  return null;
}; => globalMockState.isInitialized,
    
    getConfig: () => ({ ...currentConfig }),
    
    updateConfig: (configUpdates) => {
      currentConfig = { ...currentConfig, ...configUpdates };
      logMockRequest('CONFIG', 'Mock config updated', configUpdates);
    },
  };

  // Store globally for debugging
  if (typeof window !== 'undefined') {
    (window as any).__SHARED_MOCK_CONTEXT__ = context;
  }

  return context;
};

/**
 * Gets the existing shared mock context - used by Remote apps
 */
export const getSharedMockContext = (): MockContext | null => {
  if (typeof window !== 'undefined') {
    return (window as any).__SHARED_MOCK_CONTEXT__ || null;
  }
  return null;
};
