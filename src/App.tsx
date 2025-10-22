import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/blogs" element={<Blog />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
