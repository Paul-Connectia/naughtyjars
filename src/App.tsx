import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "./pages/auth/login";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/cartContext";

// ✅ Lazy load components for better performance
const Layout = lazy(() => import("@/layout/Layout"));
const Home = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetailPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));

// ✅ Define routes with createBrowserRouter
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
    ],
  },
]);

// ✅ Wrap in Suspense and provide router
export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </Suspense>
  );
}
