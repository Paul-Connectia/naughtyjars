import React, { useState, useEffect, useRef } from "react";
import Image from "../ui/Image";
import slide1 from '@/assets/carousel1.png'
import slide2 from '@/assets/carousel2.jpg'
// import slide3 from '@/assets/carousel3.jpg'

interface Slide {
	id: number;
	image: string;
	text: string;
}

interface Props {
	dashes?: boolean
}

const slides: Slide[] = [
	{ id: 1, image: slide1, text: "Slide 1" },
	{ id: 2, image: slide2, text: "Slide 2" },
	// { id: 3, image: slide3, text: "Slide 3" },
];

const Carousel: React.FC<Props> = ({ dashes = false }) => {
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
				prevIndex === slides.length - 1 ? 0 : prevIndex + 1
			);
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
					<Image
						key={slide.id}
						loading="eager"
						src={slide.image}
						alt={`Hero Banner ${slide.text}`}
						className="h-[520px] w-full sm:h-[280px] md:h-[360px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px]"
					/>
				))}
			</div>

			{/* Dots */}
			{dashes && <div className="flex justify-center mt-4 space-x-2">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setIndex(i)}
						className={`h-3 w-3 rounded-full transition-all ${index === i ? "bg-gray-800" : "bg-gray-400"
							}`}
					/>
				))}
			</div>}
		</div>
	);
};

export default Carousel;
