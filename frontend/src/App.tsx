import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import WelcomePage from './pages/WelcomePage';
import ShopListingsPage from './pages/ShopListingsPage';
import ShopDetailPage from './pages/ShopDetailPage';
import SellerRegistrationPage from './pages/SellerRegistrationPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import Layout from './components/Layout';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomePage,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
});

const shopsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/shops',
  component: ShopListingsPage,
});

const shopDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/shop/$shopId',
  component: ShopDetailPage,
});

const registerRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/register',
  component: SellerRegistrationPage,
});

const successRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/success',
  component: RegistrationSuccessPage,
});

const routeTree = rootRoute.addChildren([
  welcomeRoute,
  layoutRoute.addChildren([
    shopsRoute,
    shopDetailRoute,
    registerRoute,
    successRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
