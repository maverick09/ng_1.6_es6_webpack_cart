import { init, loadRemote } from '@module-federation/enhanced/runtime';
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
  private static isInitialized = false;
  private static registeredRemotes = new Map<string, boolean>();

  /**
   * Initialize the Module Federation runtime - MUST be called before any remote loading
   */
  static initialize(): void {
    if (this.isInitialized) {
      return;
    }

    try {
      init({
        name: 'host',
        remotes: [], // Will be populated dynamically
      });
      
      this.isInitialized = true;
      console.log('Module Federation initialized');
    } catch (error) {
      console.error('Failed to initialize Module Federation:', error);
      throw error;
    }
  }

  /**
   * Register a remote at runtime
   */
  static async registerRemote(config: MicroFrontendConfig): Promise<void> {
    // Ensure federation is initialized
    if (!this.isInitialized) {
      this.initialize();
    }

    if (this.registeredRemotes.has(config.name)) {
      return;
    }

    try {
      // Register the remote with the runtime
      await init({
        name: 'host',
        remotes: [
          {
            name: config.name,
            entry: config.url,
            alias: config.name,
          },
        ],
      });

      this.registeredRemotes.set(config.name, true);
      console.log(`Registered remote: ${config.name} from ${config.url}`);
    } catch (error) {
      console.error(`Failed to register remote ${config.name}:`, error);
      throw error;
    }
  }

  /**
   * Load a remote module dynamically
   */
  static async loadRemoteModule<T = any>(
    remoteName: string,
    exposedModule: string
  ): Promise<T> {
    if (!this.isInitialized) {
      throw new Error('Module Federation not initialized. Call initialize() first.');
    }

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
      try {
        await this.registerRemote(config);
        
        const module = await this.loadRemoteModule(
          config.name,
          config.exposedModule
        );
        
        const component = module[moduleName] || module.default || module;
        
        return {
          default: component,
        };
      } catch (error) {
        console.error(`Failed to load remote component ${config.name}:`, error);
        // Return error component
        return {
          default: () => (
            <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
              <h3>Failed to load remote: {config.name}</h3>
              <p>Module: {config.exposedModule}</p>
              <p>Error: {error instanceof Error ? error.message : String(error)}</p>
            </div>
          ),
        };
      }
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
  ): Promise<void> {
    // Ensure federation is initialized first
    if (!this.isInitialized) {
      this.initialize();
    }

    const promises = configs.map(async (config) => {
      try {
        await this.registerRemote(config);
      } catch (error) {
        console.error(`Failed to preload remote ${config.name}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Load runtime configuration from server/environment
   */
  static async loadRuntimeConfig(configUrl?: string): Promise<MicroFrontendConfig[]> {
    try {
      // Option 1: Load from window object
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
