import React from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { data as products } from '@/lib/database'

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <div className="p-6">Product not found.</div>;

  return <ProductDetail {...product} />;
};

export default ProductDetailPage;
