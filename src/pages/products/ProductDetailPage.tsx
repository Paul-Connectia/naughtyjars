import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { getProductById } from "@/api/products";
import type { product } from "@/types/products";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  return <ProductDetail {...product} />;
};

export default ProductDetailPage;

// import React from "react";
// import { useParams } from "react-router-dom";
// import ProductDetail from "./ProductDetail";
// import { data as products } from '@/lib/database'

// const ProductDetailPage: React.FC = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const product = products.find((p) => p.slug === slug);

//   if (!product) return <div className="p-6">Product not found.</div>;

//   return <ProductDetail {...product} />;
// };

// export default ProductDetailPage;
