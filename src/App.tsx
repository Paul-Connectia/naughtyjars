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
const AdminLayout = lazy(() => import("@/admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const CrewList = lazy(() => import("./admin/pages/CrewList"));
const AddCrew = lazy(() => import("./admin/pages/AddCrew"));
const Settings= lazy(()=>import("./admin/pages/Setting"))

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
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "crew", element: <CrewList /> },
      { path: "crew/add", element: <AddCrew /> },
      {path: "settings", element: <Settings/>}
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

// const isAdmin = true;

// {
//   path: "/admin",
//   element: isAdmin ? <AdminLayout /> : <Navigate to="/login" />,
//   children: [
//     { index: true, element: <AdminDashboard /> },
//     { path: "crew", element: <CrewList /> },
//     { path: "crew/add", element: <AddCrew /> },
//   ],
// }

