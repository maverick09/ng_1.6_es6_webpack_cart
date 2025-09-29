import type { MockConfig } from '../types';

/**
 * Utility functions for mock operations using lambda patterns
 */

export const createNetworkDelay = (config: MockConfig): Promise<void> => {
  if (!config.networkDelay) return Promise.resolve();
  
  const { min, max } = config.networkDelay;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const generateRandomId = (): number => Math.floor(Math.random() * 10000) + 1000;

export const createTimestamp = (offsetMinutes: number = 0): string => 
  new Date(Date.now() + offsetMinutes * 60000).toISOString();

export const simulateError = (config: MockConfig): boolean => {
  if (!config.errorSimulation?.enabled) return false;
  return Math.random() < (config.errorSimulation.rate || 0.05);
};

export const addRandomVariation = (baseValue: number, variationPercent: number = 0.1): number => {
  const variation = baseValue * variationPercent;
  return Math.floor(baseValue + (Math.random() * 2 - 1) * variation);
};

export const logMockRequest = (method: string, url: string, context?: any): void => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`🎯 MSW [${timestamp}] ${method} ${url}`, context || '');
};

export const createCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

export const getRandomElement = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const isValidEmail = (email: string): boolean => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const formatCurrency = (amount: number): string => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);

export const generateMockId = (prefix: string = 'mock'): string => 
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const calculatePercentage = (value: number, total: number): number =>
  total > 0 ? Math.round((value / total) * 100 * 10) / 10 : 0;

export const generateDateRange = (days: number): string[] => 
  Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return date.toISOString().split('T')[0];
  });

export const randomizeArray = <T>(array: T[]): T[] => 
  [...array].sort(() => Math.random() - 0.5);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
