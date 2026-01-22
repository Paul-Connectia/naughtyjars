import { Suspense, lazy, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./contexts/cartContext";
import { SearchProvider } from "./contexts/searchContext";
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const Layout = lazy(() => import("@/layout/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/login"));
const SignUp = lazy(() => import("./pages/auth/signup"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetailPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetailPage"));
const AdminLayout = lazy(() => import("@/admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const CrewList = lazy(() => import("./admin/pages/CrewList"));
const AddCrew = lazy(() => import("./admin/pages/AddCrew"));
const Settings = lazy(() => import("./admin/pages/Setting"));
const Cart = lazy(() => import("./pages/Cart"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

// Define User type
interface User {
  role: "admin" | "crew" | "user";
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  setLoading(false);
}, []);

if (loading) {
  return <div className="min-h-screen" />;
}

  // Admin/Crew routes (TypeScript-safe)
  const adminRoutes = user && (user.role === "admin" || user.role === "crew")
    ? {
        path: "/admin",
        element: <AdminLayout userRole={user.role} />,
        children: [
          { index: true, element: <AdminDashboard /> },
          ...(user.role === "admin"
            ? [
                { path: "crew", element: <CrewList /> },
                { path: "crew/add", element: <AddCrew /> },
                { path: "settings", element: <Settings /> },
              ]
            : []),
        ],
      }
    : null;

  // Create router
  const router = createBrowserRouter([
    // Public routes
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/products/:id", element: <ProductsPage /> },
        { path: "/product/:id", element: <ProductDetailPage /> },
        { path: "/about-us", element: <About /> },
        { path: "/blogs", element: <Blog /> },
        { path: "/blog/:slug", element: <BlogDetail /> },
        { path: "/login", element: <Login setUser={setUser} /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/cart", element: <Cart /> },
        { path: "/search", element: <SearchPage /> },
      ],
    },

    // Admin/Crew routes
    ...(adminRoutes ? [adminRoutes] : []),

    // Redirect normal users trying to access /admin
    ...(user && user.role === "user"
      ? [{ path: "/admin/*", element: <Navigate to="/" /> }]
      : []),

    // Catch-all
    { path: "*", element: <Navigate to={user ? "/admin" : "/"} /> },
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CartProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </CartProvider>
    </Suspense>
  );
}