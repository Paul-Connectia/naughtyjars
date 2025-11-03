import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "./pages/auth/login";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/cartContext";
import 'react-toastify/dist/ReactToastify.css';

// ✅ Lazy load components
const Layout = lazy(() => import("@/layout/Layout"));
const Home = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetailPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const CrewDashboard = lazy(() => import("./pages/crew/CrewDashboard"));

// ✅ Define routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products/:id", element: <ProductsPage /> },
      { path: "/product/:slug", element: <ProductDetailPage /> },
      { path: "/about-us", element: <About /> },
      { path: "/blogs", element: <Blog /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <Cart /> },
      { path: "/crew-dashboard", element: <CrewDashboard /> },
    ],
  },
]);

// ✅ App component
export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </Suspense>
  );
}
