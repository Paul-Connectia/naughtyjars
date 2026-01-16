import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Image from "@/components/ui/Image";
import Pagination from "@/components/products/Pagination";
import { getProductsByType } from "@/api/products";
import type { product } from "@/types/products";
import dirham from "@/assets/UAE_Dirham_Symbol.svg";

const ProductsPage: React.FC = () => {
  const typeArr = ["large", "small", "box", "casserole", "minis"];
  const titleArr = [
    "Original Jars(250ml)",
    "Petite Jars(150ml)",
    "Combo Boxes",
    "Casseroles",
    "Minis"
  ];

  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const type = typeArr[Number(id) - 1];
      const fetchedProducts = await getProductsByType(type);

      // Apply search filter if query exists
      const filteredProducts = searchQuery
        ? fetchedProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery) ||
              p.type.toLowerCase().includes(searchQuery) ||
              p.weight.toLowerCase().includes(searchQuery)
          )
        : fetchedProducts;

      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [id, searchQuery]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <div className="my-10 mx-5">
        <h2 className="mx-10 text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
          {titleArr[Number(id) - 1]}
        </h2>
        <div className="mx-10 mt-6 grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p._id} // use _id from backend
              to={`/product/${p._id}`}
              className="group relative w-full max-w-xs overflow-hidden hover:shadow-lg"
            >
              <div className="relative">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  className="h-48 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <button className="hidden group-hover:block px-3 py-1 text-white w-full bg-yellow-800/80 absolute top-0">
                  Checkout
                </button>
              </div>
              <div className="relative z-10 bg-[#ebe7d2] p-4">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div>
                  <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1 text-white">
                    <img
                      src={dirham}
                      alt="Dirham"
                      className="w-4 h-4 brightness-0 invert"
                    />
                    {p.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination id={Number(id)} />
      </div>
    </div>
  );
};

export default ProductsPage;