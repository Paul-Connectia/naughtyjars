import MaxContainer from "@/layout/MaxContainer";
import { useEffect, useRef, useState } from "react";
import Image from "../ui/Image";

const reviews = [
  {
    id: 1,
    text: "Serradura is a Portuguese dessert made with layers of crushed biscuits and sweet cream, creating a delightful, creamy, and crunchy treat. This one was amazingly made by Naughty Jars",
    author: "Anu Eliza",
  },
  {
    id: 2,
    text: "I just served the tiramisu to my guests. They loved it. We liked how balanced the coffee and the cream tasted, how it wasn’t extra sugary.Nobody stopped at a single serving and everyone had a mild smile on their face after eating it. Many compliments and many thanks to you for getting this done so quickly and I can’t wait to reorder.",
    author: "Kanav Minocha",
  },
  {
    id: 3,
    text: "The best tiramisu in the whole of UAE",
    author: "Ketaki Golatkar",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 3000; // 3 seconds

  const resetTimeout = (): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Automatic slide effect
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => resetTimeout();
  }, [index]);

  return (
    <section className="px-5 py-16 sm:px-8 md:px-10">
      <MaxContainer>
        <h4 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
          Reviews
        </h4>

        <div className="relative">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/home/quote.png"
                className="h-auto w-20 object-contain sm:w-28"
              />
            </div>

            <div className="flex-1">
              <p className="mb-8 text-lg tracking-widest leading-relaxed normal-case">
                {reviews[index].text}
              </p>

              <div className="flex items-center justify-end gap-6">
                <span className="font-serif text-lg sm:text-2xl">
                  {reviews[index].author}
                </span>

                <div className="flex-shrink-0 rotate-180">
                  <Image
                    src="/home/quote.png"
                    className="h-auto w-20 object-contain sm:w-28"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-1 cursor-pointer transition-all duration-300 ${index === idx
                  ? "w-16 bg-purple-600"
                  : "w-12 bg-stone-400"
                  }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </MaxContainer>
    </section>
  );
}
