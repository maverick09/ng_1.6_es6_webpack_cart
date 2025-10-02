import { useEffect, useState, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { MicroFrontendService, MicroFrontendConfig } from './services/MicroFrontendService';

function App() {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMicroFrontends = async () => {
      try {
        // Load configuration from runtime environment
        const configs = await MicroFrontendService.loadRuntimeConfig(
          import.meta.env.VITE_CONFIG_URL
        );

        // Alternatively, define configs directly (can be from env vars)
        const microFrontends: MicroFrontendConfig[] = configs.length > 0 ? configs : [
          {
            name: 'remote1',
            url: import.meta.env.VITE_REMOTE1_URL || 'http://localhost:5001/remoteEntry.js',
            exposedModule: './App',
            routePath: '/app1/*',
            routeData: { title: 'Remote App 1' },
          },
          {
            name: 'remote2',
            url: import.meta.env.VITE_REMOTE2_URL || 'http://localhost:5002/remoteEntry.js',
            exposedModule: './Dashboard',
            routePath: '/app2/*',
            moduleName: 'Dashboard',
            routeData: { title: 'Remote App 2' },
          },
        ];

        // Preload remote entries for better performance
        await MicroFrontendService.preloadRemoteEntries(microFrontends);

        // Create dynamic routes
        const dynamicRoutes = MicroFrontendService.createMicroFrontendRoutes(microFrontends);

        // Define all routes
        const routes: RouteObject[] = [
          {
            path: '/',
            element: <Home />,
          },
          ...dynamicRoutes,
          {
            path: '*',
            element: <NotFound />,
          },
        ];

        // Create router
        const browserRouter = createBrowserRouter(routes);
        setRouter(browserRouter);
      } catch (error) {
        console.error('Failed to initialize micro frontends:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeMicroFrontends();
  }, []);

  if (loading || !router) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading micro frontends...</div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

function Home() {
  return (
    <div>
      <h1>Host Application</h1>
      <nav>
        <a href="/app1">Go to Remote App 1</a> | 
        <a href="/app2">Go to Remote App 2</a>
      </nav>
    </div>
  );
}

function NotFound() {
  return <div>404 - Page Not Found</div>;
}

export default App;