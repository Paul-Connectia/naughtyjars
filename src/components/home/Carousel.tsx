import React, { useState, useEffect, useRef } from "react";
import Image from "../ui/Image";

import slide1 from "@/assets/carousel1.png";

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
    image: slide1,
  },
  {
    id: 2,
    text: "Slide 2",
    images: ["/carousel2/DSCF0564.jpg","/carousel2/DSCF0725.jpg","/carousel2/DSCF0747.jpg","/carousel2/DSCF0830.jpg"],
  },
  {
    id: 3,
    text: "Slide 3",
    images: ["/carousel3/DSCF0410.jpg","/carousel3/DSCF0577.jpg","/carousel3/DSCF0597.jpg","/carousel3/DSCF0623.jpg"],
  },
];

const HEIGHT_CLASSES =
  "h-[520px] w-full sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px]";

const Carousel: React.FC<Props> = ({ dashes = false }) => {
  const [index, setIndex] = useState<number>(0);
  const [preloadedSlides, setPreloadedSlides] = useState<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 3000;

  // Preload next slide images
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    // Preload current slide and next slide
    const slidesToPreload = [index, (index + 1) % slides.length];
    
    slidesToPreload.forEach((slideIndex) => {
      if (!preloadedSlides.includes(slideIndex)) {
        const slide = slides[slideIndex];
        
        if (slide.image) {
          preloadImage(slide.image);
        }
        
        if (slide.images) {
          // Only preload first 2 images on mobile, all on desktop
          const imagesToPreload = window.innerWidth < 768 ? slide.images.slice(0, 2) : slide.images;
          imagesToPreload.forEach(preloadImage);
        }
        
        setPreloadedSlides(prev => [...prev, slideIndex]);
      }
    });
  }, [index]);

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
        {slides.map((slide, slideIndex) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            {/* SINGLE IMAGE SLIDE */}
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.text}
                loading={slideIndex === index ? "eager" : "lazy"}
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
                    // Only load eagerly for current slide and first 2 images on mobile
                    loading={
                      slideIndex === index 
                        ? (window.innerWidth < 768 && i < 2 ? "eager" : "lazy")
                        : "lazy"
                    }
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