import React, { useState, useEffect, useRef } from "react";
import Image from "../ui/Image";

import slide1 from "@/assets/carousel1.png";

// // slide-2 images (4 merged)
// import s2_1 from "@/assets/slide2-1.jpg";
// import s2_2 from "@/assets/slide2-2.jpg";
// import s2_3 from "@/assets/slide2-3.jpg";
// import s2_4 from "@/assets/slide2-4.jpg";

// // slide-3 images (4 merged)
// import s3_1 from "@/assets/slide3-1.jpg";
// import s3_2 from "@/assets/slide3-2.jpg";
// import s3_3 from "@/assets/slide3-3.jpg";
// import s3_4 from "@/assets/slide3-4.jpg";

interface Slide {
  id: number;
  text: string;
  image?: string;
  images?: string[];
}

interface Props {
  dashes?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    text: "Slide 1",
    image: slide1, // keep as it is
  },
  {
    id: 2,
    text: "Slide 2",
    images: ["/carousel2/DSCF0564.jpg","/carousel2/DSCF0725.jpg","/carousel2/DSCF0747.jpg","/carousel2/DSCF0830.jpg"], // merged
  },
  {
    id: 3,
    text: "Slide 3",
    images: ["/carousel3/DSCF0410.jpg","/carousel3/DSCF0577.jpg","/carousel3/DSCF0597.jpg","/carousel3/DSCF0623.jpg"], // merged
  },
];

const HEIGHT_CLASSES =
  "h-[520px] w-full sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px]";

const Carousel: React.FC<Props> = ({ dashes = false }) => {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 3000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, delay);

    return () => resetTimeout();
  }, [index]);

  return (
    <div className="relative w-full overflow-hidden shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            {/* SINGLE IMAGE SLIDE */}
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.text}
                loading="eager"
                className={`${HEIGHT_CLASSES} object-cover`}
              />
            )}

            {/* MERGED IMAGE SLIDE */}
			{slide.images && (
			  <div
			    className={`
			      grid grid-cols-2
			      md:grid-cols-4
			      ${HEIGHT_CLASSES}
			    `}
			  >
			    {slide.images.map((img, i) => (
			      <Image
			        key={i}
			        src={img}
			        alt={`${slide.text} ${i + 1}`}
			        loading="eager"
			        className={`
          w-full h-full object-cover
          ${i >= 2 ? "hidden md:block" : ""}
        `}
			      />
			    ))}
			  </div>
			)}
          </div>
        ))}
      </div>

      {/* Dots */}
      {dashes && (
        <div className="mt-4 flex justify-center space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === i ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
