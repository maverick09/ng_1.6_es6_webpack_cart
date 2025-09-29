/**
 * ENTERPRISE SOLUTION: Shared Mock Context Pattern
 * 
 * This creates a shared mock context that can be initialized by Shell
 * and consumed by Remote apps via Module Federation, bypassing the
 * service worker cross-origin limitations.
 */

import type { MockConfig, MockContext, CartItem, User } from '../types';
import { mockData } from './data';
import { createNetworkDelay, generateRandomId, logMockRequest, addRandomVariation } from './utils';

// Global shared state - managed by Shell, accessible by all apps
interface GlobalMockState {
  cartItems: CartItem[];
  authToken: string | null;
  user: User | null;
  requestCount: number;
  isInitialized: boolean;
}

let globalMockState: GlobalMockState = {
  cartItems: [],
  authToken: null,
  user: null,
  requestCount: 0,
  isInitialized: false,
};

let currentConfig: MockConfig = {
  enableLogging: true,
  networkDelay: { min: 100, max: 500 },
  errorSimulation: { enabled: false, rate: 0.05 },
};

/**
 * Creates the shared mock context - called ONLY by Shell app
 */
export const createSharedMockContext = (config?: MockConfig): MockContext => {
  if (config) {
    currentConfig = { ...currentConfig, ...config };
  }
  
  globalMockState.isInitialized = true;
  
  console.log('🏗️ Creating shared mock context for micro-frontends');
  console.log('📍 This will handle API calls for Shell (8080) and Remote (9000)');
  
  const context: MockContext = {
    // Shell API implementations
    getShellConfig: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('GET', '/api/shell/config', 'Via Mock Context');
      
      return {
        ...mockData.shellConfig,
        buildTime: new Date().toISOString(),
        requestCount: globalMockState.requestCount,
      };
    },

    getUser: async (detailed = false) => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('GET', '/api/shell/user', { detailed, hasAuth: !!globalMockState.authToken });
      
      if (!globalMockState.authToken) {
        throw new Error('Authentication required');
      }
      
      return detailed 
        ? { ...mockData.user, analytics: mockData.analytics }
        : mockData.user;
    },

    updateUserPreferences: async (preferences) => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('PATCH', '/api/shell/user/preferences', preferences);
      
      return {
        success: true,
        message: 'Preferences updated via shared context',
        updatedPreferences: { ...mockData.user.preferences, ...preferences },
      };
    },

    getAnalytics: async () => {
      await createNetworkDelay(currentConfig);
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
      
      logMockRequest('GET', '/api/shell/analytics', 'Real-time data via context');
      
      return analytics;
    },

    getNotifications: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('GET', '/api/shell/notifications', `${mockData.notifications.length} notifications`);
      
      return mockData.notifications;
    },

    getShellHealth: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      const health = {
        status: 'healthy' as const,
        service: 'shell-app',
        port: 8080,
        version: mockData.shellConfig.version,
        mockContext: {
          active: true,
          pattern: 'Shared Context',
          requestsHandled: globalMockState.requestCount,
          sharedState: {
            cartItems: globalMockState.cartItems.length,
            authenticated: !!globalMockState.authToken,
          },
        },
        connectedApps: ['shell-8080', 'remote-9000'],
        timestamp: new Date().toISOString(),
      };
      
      logMockRequest('GET', '/api/shell/health', 'Health via context');
      
      return health;
    },

    // Remote API implementations
    getRemoteConfig: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('GET', '/api/remote/config', 'Via Shared Context');
      
      return {
        ...mockData.remoteConfig,
        buildTime: new Date().toISOString(),
        mockContext: {
          active: true,
          sharedWithShell: true,
          cartItems: globalMockState.cartItems.length,
          authenticated: !!globalMockState.authToken,
        },
        ports: { shell: 8080, remote: 9000 },
      };
    },

    getProducts: async (filters = {}) => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      const { category, search, inStockOnly } = filters;
      
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
        filters, 
        resultCount: products.length,
        viaContext: true 
      });
      
      return products;
    },

    getDashboard: async () => {
      await createNetworkDelay(currentConfig);
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
          pattern: 'Shared Mock Context',
        },
      };
      
      logMockRequest('GET', '/api/remote/dashboard', 'Dashboard via context');
      
      return dashboard;
    },

    // SHARED CART STATE - This is the key benefit!
    getCart: async () => {
      await createNetworkDelay(currentConfig);
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
        managedBy: 'Shell MockContext',
      };
      
      logMockRequest('GET', '/api/remote/cart', { 
        itemCount: cart.itemCount,
        sharedBetweenApps: true,
        viaContext: true 
      });
      
      return cart;
    },

    addToCart: async (productId, quantity) => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      // Update SHARED cart state
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
        note: 'Added to SHARED context - visible across Shell & Remote!',
        viaContext: true 
      });
      
      return {
        success: true,
        message: 'Item added to shared cart context (visible in both Shell and Remote)',
        cartItemCount: totalItems,
        isSharedContext: true,
      };
    },

    removeFromCart: async (productId) => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      globalMockState.cartItems = globalMockState.cartItems.filter(item => item.productId !== productId);
      
      logMockRequest('DELETE', `/api/remote/cart/${productId}`, 'Removed from shared context');
      
      return {
        success: true,
        message: 'Item removed from shared cart context',
        isSharedContext: true,
      };
    },

    getRemoteHealth: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      const health = {
        status: 'healthy' as const,
        service: 'remote-app',
        port: 9000,
        version: mockData.remoteConfig.version,
        mockContext: {
          active: true,
          pattern: 'Shared Context via Shell',
          connectedToShell: true,
          requestsHandled: globalMockState.requestCount,
        },
        sharedState: {
          cartItems: globalMockState.cartItems.length,
          authenticated: !!globalMockState.authToken,
        },
        timestamp: new Date().toISOString(),
      };
      
      logMockRequest('GET', '/health', 'Remote health via context');
      
      return health;
    },

    // Shared authentication - affects both apps
    login: async (email, password) => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      logMockRequest('POST', '/api/auth/login', { email, viaContext: true });
      
      if (email === 'john.doe@company.com' && password === 'password') {
        globalMockState.authToken = `context-token-${generateRandomId()}`;
        globalMockState.user = mockData.user;
        
        return {
          success: true,
          user: mockData.user,
          token: globalMockState.authToken,
          expiresIn: 3600,
          message: 'Authenticated via shared context - valid for Shell & Remote',
          context: 'Shared between all micro-frontends',
        };
      }
      
      throw new Error('Invalid credentials');
    },

    logout: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      globalMockState.authToken = null;
      globalMockState.user = null;
      
      logMockRequest('POST', '/api/auth/logout', 'Global logout via context');
      
      return { 
        success: true, 
        message: 'Logged out from shared context - affects all micro-frontends' 
      };
    },

    getSharedConfig: async () => {
      await createNetworkDelay(currentConfig);
      globalMockState.requestCount++;
      
      return {
        mockContextInfo: {
          pattern: 'Shared Mock Context',
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
      };
    },

    // State management functions
    getState: () => ({ ...globalMockState }),
    
    setState: (updates) => {
      globalMockState = { ...globalMockState, ...updates };
      logMockRequest('STATE', 'Global state updated', updates);
    },

    // Configuration functions
    isActive: () => globalMockState.isInitialized,
    
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
