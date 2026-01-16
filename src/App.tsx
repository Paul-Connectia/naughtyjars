import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/cartContext";
import { SearchProvider } from "./contexts/searchContext";
import 'react-toastify/dist/ReactToastify.css';

// ✅ Lazy load components
const Layout = lazy(() => import("@/layout/Layout"));
const Home = lazy(() => import("./pages/Home"));
const  Login =lazy(()=>import("./pages/auth/login"))
const SignUp =lazy(()=>import("./pages/auth/signup"))
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetailPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetailPage")); // Update to the correct file name
const AdminLayout = lazy(() => import("@/admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const CrewList = lazy(() => import("./admin/pages/CrewList"));
const AddCrew = lazy(() => import("./admin/pages/AddCrew"));
const Settings= lazy(()=>import("./admin/pages/Setting"))
const SearchPage = lazy(() => import("./pages/SearchPage"));
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
      {path: "/blog/:slug", element: <BlogDetail />},
      { path: "/login", element: <Login /> },
      {path:"/signup", element:<SignUp/>},
      { path: "/cart", element: <Cart /> },
      {path:"/search", element:<SearchPage/>}
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
        <SearchProvider>
        <RouterProvider router={router} />
        </SearchProvider>
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

