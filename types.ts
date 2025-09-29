// Shared type definitions for all micro-frontends

export interface MockConfig {
  enableLogging?: boolean;
  networkDelay?: {
    min: number;
    max: number;
  };
  errorSimulation?: {
    enabled: boolean;
    rate: number; // 0.0 to 1.0
  };
}

// Shell Types
export interface ShellConfig {
  title: string;
  version: string;
  features: string[];
  environment: string;
  buildTime: string;
  apiEndpoint: string;
  mockPattern?: string;
  ports?: { shell: number; remote: number };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  lastLogin: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    language: string;
  };
}

export interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: Array<{
    path: string;
    views: number;
    percentage: number;
  }>;
  userAgent: {
    chrome: number;
    firefox: number;
    safari: number;
    other: number;
  };
  realTime: {
    activeUsers: number;
    currentPage: string;
    lastUpdate: string;
  };
}

export interface Notification {
  id: number;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

// Remote Types  
export interface RemoteConfig {
  name: string;
  version: string;
  features: string[];
  apiEndpoint: string;
  environment: string;
  buildTime: string;
  mockContext?: {
    active: boolean;
    sharedWithShell: boolean;
    cartItems: number;
    authenticated: boolean;
  };
  ports?: { shell: number; remote: number };
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
  rating: number;
  imageUrl: string;
  tags: string[];
}

export interface DashboardData {
  stats: {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
  };
  recentActivity: Array<{
    id: number;
    type: 'order' | 'customer' | 'product';
    message: string;
    timestamp: string;
  }>;
  topProducts: Array<{
    id: number;
    name: string;
    sales: number;
  }>;
  contextInfo?: {
    requestsHandled: number;
    sharedCartItems: number;
    authenticated: boolean;
    pattern: string;
  };
}

export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
  total?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  isSharedContext?: boolean;
  managedBy?: string;
}

// Mock Context Interface
export interface MockContext {
  // Shell API functions
  getShellConfig: () => Promise<ShellConfig>;
  getUser: (detailed?: boolean) => Promise<User>;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => Promise<any>;
  getAnalytics: () => Promise<AnalyticsData>;
  getNotifications: () => Promise<Notification[]>;
  getShellHealth: () => Promise<any>;
  
  // Remote API functions  
  getRemoteConfig: () => Promise<RemoteConfig>;
  getProducts: (filters?: {
    category?: string;
    search?: string;
    inStockOnly?: boolean;
  }) => Promise<Product[]>;
  getDashboard: () => Promise<DashboardData>;
  getCart: () => Promise<Cart>;
  addToCart: (productId: number, quantity: number) => Promise<any>;
  removeFromCart: (productId: number) => Promise<any>;
  getRemoteHealth: () => Promise<any>;
  
  // Shared API functions
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  getSharedConfig: () => Promise<any>;
  getGlobalState: () => Promise<any>;
  
  // State management
  getState: () => any;
  setState: (updates: any) => void;
  
  // Configuration
  isActive: () => boolean;
  getConfig: () => MockConfig;
  updateConfig: (config: Partial<MockConfig>) => void;
}

// Shared Types
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  version: string;
  uptime: string;
  memory?: {
    used: string;
    available: string;
    percentage: number;
  };
  dependencies?: Record<string, 'healthy' | 'degraded' | 'unhealthy'>;
  timestamp: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  tokens?: AuthTokens;
  token?: string;
  expiresIn?: number;
  message?: string;
}
