import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useCart } from "@/contexts/cartContext";
import type { product } from "@/types/products";
import { toast } from "react-toastify";

interface ProductDetailProps {
  name: string;
  slug: string;
  price: number;
  images: string[];
  weight: string;
  description?: string;
  reviews?: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  name,
  slug,
  price,
  images,
  weight,
  description,
  reviews,
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useCart();

  const handleAddToCart = (
    product: Omit<product, "description" | "reviews" | "type">,
  ) => {
    toast.success("Product added to cart", {
      style: {
        backgroundColor: "#7e3c94",
        color: "#fff",
      },
    });
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.slug,
        name: product.name,
        price: product.price,
        quantity: quantity,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#ebe7d2] px-6 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-3 md:grid-cols-3">
        {/* LEFT - Thumbnails */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative"
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`${name} ${idx}`}
                className={`h-25 w-25 cursor-pointer rounded border object-cover transition hover:scale-105 ${img === mainImage ? "border-yellow-500" : "border-gray-300"
                  }`}
              />
              {idx === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.5 5.5v9l8-4.5-8-4.5z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CENTER - Main Image */}
        <div className="flex justify-center">
          <img
            src={mainImage}
            alt={name}
            className="h-[400px] w-[400px] rounded-lg border object-cover shadow-lg"
          />
        </div>

        {/* RIGHT - Product Info */}
        <div className="flex flex-col gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400">
            {"★★★★★"}
            <span className="ml-2 text-sm text-gray-700">{reviews} / 5</span>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>

          {/* Weight */}
          <p className="font-medium text-gray-700">Weight: {weight}</p>

          {/* Price */}
          <p className="mt-2 inline-block rounded-full bg-yellow px-3 py-1 w-fit text-white">
            {price} AED
          </p>

          {/* Quantity + Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border">
              <button
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus />
              </button>
            </div>
            <button
              onClick={() =>
                handleAddToCart({
                  name,
                  slug,
                  price,
                  images,
                  weight,
                })
              }
              className="bg-gray-700 px-5 py-2 font-semibold text-white transition hover:bg-gray-600"
            >
              Add to Cart
            </button>
          </div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/+971585061377?text=I'd like to buy this product -- ${window.location.href} -- quantity: ${quantity}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2 px-2 py-2 transition">
              <div className="h-10 w-10 rounded-3xl bg-[#25D366]">
                <img
                  src="/whatsapp-logo.png"
                  alt="WhatsApp"
                  className="mt-1 ml-1 h-8 w-8 object-contain"
                />
              </div>
              <span className="rounded-3xl bg-yellow px-5 py-2 font-semibold text-white transition hover:bg-yellow-800/80">
                Order on WhatsApp
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="mx-auto mt-10 max-w-5xl">
        <h2 className="mb-3 text-2xl font-semibold text-gray-800">
          Description
        </h2>
        <p className="leading-relaxed text-gray-700">
          {description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis."}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
