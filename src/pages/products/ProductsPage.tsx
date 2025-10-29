import React from "react";
import { Link, useParams } from "react-router-dom";
// import Carousel from "@/components/home/Carousel";
import Image from "@/components/ui/Image";
import Pagination from "@/components/products/Pagination";
import { data } from "@/lib/database"
import type { product } from "@/types/products";


const ProductsPage: React.FC = () => {

  const typeArr = ['large', 'small', 'box']
  const titleArr = ['Original Jars(250ml)', 'Petite Jars(150ml)', 'Combo Boxes']

  const { id } = useParams<{ id: string }>()
  const products: product[] = data.filter(product => product.type === typeArr[Number(id) - 1])

  return (
    <div className="">
      {/* <Carousel /> */}
      <div className=" my-10 mx-5">
        <h2 className="mx-10 text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">{titleArr[Number(id) - 1]}</h2>
        <div className="mx-10 mt-6 grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">

          {products.map((p) => (
            <Link
              key={p.slug}
              to={`/product/${p.slug}`} // dynamic slug route
              className="group relative w-full max-w-xs overflow-hidden  hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  className="h-48 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <button className="hidden group-hover:block px-3 py-1 text-white w-full bg-yellow-800/80 absolute top-0">
                  Add to Cart
                </button>
              </div>



              {/* Product Info */}
              <div className="relative z-10 bg-[#ebe7d2] p-4">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="">
                  <p className="mt-2 inline-block rounded-full bg-yellow px-3 py-1 text-white">
                    {p.price} AED
                  </p>
                </div>
              </div>
              {/* Add to Cart button at bottom */}
            </Link>
          ))}
        </div>
        <Pagination id={Number(id)} />
      </div>
    </div>
  );
};

export default ProductsPage;
