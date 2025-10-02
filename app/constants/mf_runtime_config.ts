import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

// This will be populated at runtime from your environment config
const runtimeConfig = {
  remotes: {
    // These will be injected from window.__RUNTIME_CONFIG__ or API call
  },
};

const runtimePlugin: () => FederationRuntimePlugin = () => ({
  name: 'dynamic-remote-plugin',
  beforeInit(args) {
    // Load runtime configuration from window object or API
    const envConfig = (window as any).__RUNTIME_CONFIG__;
    
    if (envConfig?.remotes) {
      // Merge runtime remotes with static config
      return {
        ...args,
        options: {
          ...args.options,
          remotes: [
            ...(args.options.remotes || []),
            ...Object.entries(envConfig.remotes).map(([name, config]: [string, any]) => ({
              name,
              entry: config.url,
              alias: name,
            })),
          ],
        },
      };
    }
    
    return args;
  },
});

export default runtimePlugin;