import { loadRemote, registerRemotes } from '@module-federation/enhanced/runtime';
import { ComponentType, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export interface MicroFrontendConfig {
  name: string;
  url: string;
  exposedModule: string;
  routePath: string;
  moduleName?: string;
  routeData?: any;
}

export class MicroFrontendService {
  private static registeredRemotes = new Set<string>();

  /**
   * Register a remote at runtime
   */
  static async registerRemote(config: MicroFrontendConfig): Promise<void> {
    if (this.registeredRemotes.has(config.name)) {
      return;
    }

    await registerRemotes([
      {
        name: config.name,
        entry: config.url,
        alias: config.name,
      },
    ]);

    this.registeredRemotes.add(config.name);
  }

  /**
   * Load a remote module dynamically
   */
  static async loadRemoteModule<T = any>(
    remoteName: string,
    exposedModule: string
  ): Promise<T> {
    try {
      const module = await loadRemote<T>(`${remoteName}/${exposedModule}`);
      return module;
    } catch (error) {
      console.error(`Failed to load remote module ${remoteName}/${exposedModule}:`, error);
      throw error;
    }
  }

  /**
   * Create a lazy-loaded React component from a remote
   */
  static createRemoteComponent(
    config: MicroFrontendConfig
  ): ComponentType<any> {
    const moduleName = config.moduleName || 'default';
    
    return lazy(async () => {
      await this.registerRemote(config);
      
      const module = await this.loadRemoteModule(
        config.name,
        config.exposedModule || './App'
      );
      
      return {
        default: module[moduleName] || module.default || module,
      };
    });
  }

  /**
   * Setup a single micro frontend route
   */
  static setupMicroFrontendRoute(config: MicroFrontendConfig): RouteObject {
    const RemoteComponent = this.createRemoteComponent(config);

    return {
      path: config.routePath,
      element: <RemoteComponent />,
      // Pass any additional route data
      ...(config.routeData && { handle: config.routeData }),
    };
  }

  /**
   * Create multiple micro frontend routes
   */
  static createMicroFrontendRoutes(
    configs: MicroFrontendConfig[]
  ): RouteObject[] {
    return configs.map((config) => this.setupMicroFrontendRoute(config));
  }

  /**
   * Preload remote entries (for better initial load performance)
   */
  static async preloadRemoteEntries(
    configs: MicroFrontendConfig[]
  ): Promise<void[]> {
    return Promise.all(
      configs.map((config) => this.registerRemote(config))
    );
  }

  /**
   * Load runtime configuration from server/environment
   */
  static async loadRuntimeConfig(configUrl?: string): Promise<MicroFrontendConfig[]> {
    try {
      // Option 1: Load from window object (injected by build process)
      if ((window as any).__RUNTIME_CONFIG__?.microFrontends) {
        return (window as any).__RUNTIME_CONFIG__.microFrontends;
      }

      // Option 2: Load from API endpoint
      if (configUrl) {
        const response = await fetch(configUrl);
        const config = await response.json();
        return config.microFrontends || [];
      }

      return [];
    } catch (error) {
      console.error('Failed to load runtime config:', error);
      return [];
    }
  }
}