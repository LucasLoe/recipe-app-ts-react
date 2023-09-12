// src/components/Carousel.tsx
import React, { useState } from "react";
import RecipeSlide from "./RecipeSlide";
import { RecipeFromApi } from "../types";

interface CarouselProps {
	recipes: RecipeFromApi[];
	setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
}

const Carousel: React.FC<CarouselProps> = ({ recipes }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? recipes.length - 1 : prevIndex - 1));
	};

	return (
		<div className='relative w-full h-full'>
			{recipes.map((rec, index) => (
				<div
					key={index}
					className={`${
						index === currentIndex ? "block" : "hidden"
					} absolute top-0 left-0 w-full h-full`}
				>
					<RecipeSlide recipe={rec} />
				</div>
			))}
			<button
				className='text-xl absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-l'
				onClick={prevSlide}
			>
				Previous
			</button>
			<button
				className='text-xl absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-r'
				onClick={nextSlide}
			>
				Next
			</button>
		</div>
	);
};

export default Carousel;
