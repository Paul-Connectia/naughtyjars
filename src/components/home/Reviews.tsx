import MaxContainer from "@/layout/MaxContainer";
import { useEffect, useRef, useState } from "react";
import Image from "../ui/Image";

const reviews = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea co",
    author: "Full Name",
  },
  {
    id: 2,
    text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
    author: "Jane Smith",
  },
  {
    id: 3,
    text: "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.",
    author: "John Doe",
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
          reviews
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
              <p className="mb-8 text-lg leading-relaxed">
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
