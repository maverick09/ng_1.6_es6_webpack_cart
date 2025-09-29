import type { 
  ShellConfig, 
  User, 
  AnalyticsData, 
  Notification, 
  RemoteConfig, 
  Product, 
  DashboardData 
} from '../types';

// Centralized mock data used by ALL micro-frontends
export const mockData = {
  shellConfig: {
    title: 'Enterprise Shell Application',
    version: '2.1.0',
    features: [
      'React 19 TypeScript',
      'Module Federation',
      'Shared Mock Context Pattern', 
      'Cross-Port Communication',
      'Enterprise Architecture',
      'Shared State Management'
    ],
    environment: 'development',
    buildTime: new Date().toISOString(),
    apiEndpoint: '/api/shell',
    mockPattern: 'Shared Context Pattern',
    ports: { shell: 8080, remote: 9000 },
  } as ShellConfig,

  user: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Senior Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    preferences: {
      theme: 'light' as const,
      notifications: true,
      language: 'en-US',
    },
  } as User,

  analytics: {
    pageViews: 15432,
    uniqueUsers: 8901,
    bounceRate: 0.23,
    avgSessionDuration: '4m 32s',
    topPages: [
      { path: '/', views: 5421, percentage: 35.1 },
      { path: '/remote', views: 3210, percentage: 20.8 },
      { path: '/analytics', views: 2876, percentage: 18.6 },
      { path: '/profile', views: 1876, percentage: 12.2 },
      { path: '/docs', views: 1049, percentage: 6.8 },
    ],
    userAgent: {
      chrome: 68,
      firefox: 18,
      safari: 11,
      other: 3,
    },
    realTime: {
      activeUsers: 23,
      currentPage: '/remote',
      lastUpdate: new Date().toISOString(),
    },
  } as AnalyticsData,

  notifications: [
    {
      id: 1,
      type: 'success' as const,
      title: 'Shared Mock Context Active',
      message: 'Shell (8080) and Remote (9000) apps sharing mock context successfully',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      read: false,
    },
    {
      id: 2,
      type: 'info' as const,
      title: 'Cross-Port Communication',
      message: 'Mock context bypasses service worker limitations for micro-frontends',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      read: false,
    },
    {
      id: 3,
      type: 'warning' as const,
      title: 'Development Mode',
      message: 'Shared mock context active - disable for production builds',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      read: true,
    },
    {
      id: 4,
      type: 'info' as const,
      title: 'Enterprise Pattern',
      message: 'Using enterprise-grade shared mock context pattern for micro-frontends',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      read: true,
    },
  ] as Notification[],

  remoteConfig: {
    name: 'Product Management Remote App',
    version: '1.5.2',
    features: [
      'React 19 TSX',
      'Shared Mock Context Consumer',
      'Real-time Dashboard', 
      'Product Catalog', 
      'Cart Management',
      'Cross-App State Sharing'
    ],
    apiEndpoint: '/api/remote',
    environment: 'development',
    buildTime: new Date().toISOString(),
  } as RemoteConfig,

  products: [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      price: 199.99,
      category: 'electronics',
      inStock: true,
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      tags: ['wireless', 'noise-cancelling', 'premium']
    },
    {
      id: 2,
      name: 'Smart Watch Ultra',
      price: 299.99,
      category: 'electronics',
      inStock: true,
      description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life',
      rating: 4.3,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      tags: ['smartwatch', 'fitness', 'gps']
    },
    {
      id: 3,
      name: 'Coffee Maker Deluxe',
      price: 89.99,
      category: 'appliances',
      inStock: false,
      description: 'Programmable coffee maker with built-in grinder and thermal carafe',
      rating: 4.1,
      imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=300&h=300&fit=crop',
      tags: ['coffee', 'programmable', 'grinder']
    },
    {
      id: 4,
      name: 'Running Shoes Elite',
      price: 129.99,
      category: 'clothing',
      inStock: true,
      description: 'Professional running shoes with advanced cushioning and breathable mesh',
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      tags: ['running', 'athletic', 'breathable']
    },
    {
      id: 5,
      name: 'LED Desk Lamp Smart',
      price: 49.99,
      category: 'furniture',
      inStock: true,
      description: 'Smart LED desk lamp with app control, multiple brightness levels, and USB charging',
      rating: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
      tags: ['led', 'smart', 'adjustable']
    },
    {
      id: 6,
      name: 'Bluetooth Speaker Max',
      price: 79.99,
      category: 'electronics',
      inStock: true,
      description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design',
      rating: 4.4,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      tags: ['bluetooth', 'portable', 'waterproof']
    },
    {
      id: 7,
      name: 'Gaming Keyboard Mechanical',
      price: 159.99,
      category: 'electronics',
      inStock: true,
      description: 'RGB mechanical gaming keyboard with customizable switches and macro support',
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
      tags: ['gaming', 'mechanical', 'rgb']
    },
    {
      id: 8,
      name: 'Ergonomic Office Chair',
      price: 399.99,
      category: 'furniture',
      inStock: true,
      description: 'Premium ergonomic office chair with lumbar support and adjustable height',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      tags: ['ergonomic', 'office', 'comfort']
    },
  ] as Product[],

  dashboardData: {
    stats: {
      totalSales: 1247,
      totalOrders: 892,
      totalCustomers: 456,
      totalRevenue: 89750,
    },
    recentActivity: [
      {
        id: 1,
        type: 'order' as const,
        message: 'New order #1234 received for Wireless Headphones Pro',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      },
      {
        id: 2,
        type: 'customer' as const, 
        message: 'New customer registration: jane.doe@email.com',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      },
      {
        id: 3,
        type: 'product' as const,
        message: 'Product "Smart Watch Ultra" back in stock',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      },
      {
        id: 4,
        type: 'order' as const,
        message: 'Order #1233 completed and shipped',
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      },
      {
        id: 5,
        type: 'customer' as const,
        message: 'Customer review: 5 stars for Running Shoes Elite',
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      },
    ],
    topProducts: [
      { id: 4, name: 'Running Shoes Elite', sales: 234 },
      { id: 1, name: 'Wireless Headphones Pro', sales: 189 },
      { id: 6, name: 'Bluetooth Speaker Max', sales: 156 },
      { id: 2, name: 'Smart Watch Ultra', sales: 134 },
      { id: 5, name: 'LED Desk Lamp Smart', sales: 98 },
    ],
  } as DashboardData,

  // Additional mock data
  categories: [
    { id: 'all', name: 'All Categories', count: 8 },
    { id: 'electronics', name: 'Electronics', count: 4 },
    { id: 'furniture', name: 'Furniture', count: 2 },
    { id: 'clothing', name: 'Clothing', count: 1 },
    { id: 'appliances', name: 'Appliances', count: 1 },
  ],

  popularSearches: [
    'wireless headphones',
    'smart watch',
    'gaming keyboard',
    'office chair',
    'bluetooth speaker',
  ],
};
