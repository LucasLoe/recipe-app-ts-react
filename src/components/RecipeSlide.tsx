import { RecipeFromApi } from "../types";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import RecipePopUp from "./RecipePopUp";

type RecipeSlideProps = {
	recipe: RecipeFromApi;
	children: ReactNode;
};

type RecipeTitleProps = {
	title: string;
};

type RecipeShortInformationProps = {
	recipe: RecipeFromApi;
};
const RecipeTitle = (props: RecipeTitleProps) => {
	return <h2 className='text-3xl font-thin my-1 w-fit'>{props.title}</h2>;
};

const RecipeShortInformation = (props: RecipeShortInformationProps) => {
	const { recipe } = props;
	return (
		<div className=' w-full my-1 flex flex-row justify-between items-center text-md'>
			<p className=''>{`${Math.round(recipe.calories / recipe.yield)} kcal per serving`}</p>
			<div>
				{recipe.cautions &&
					recipe.cautions.map((elem, idx) => {
						return (
							<span key={idx} className='mx-1 font-thin'>
								{elem}
							</span>
						);
					})}
			</div>
			<p className=''>{`${recipe.mealType}`}</p>
		</div>
	);
};

const RecipeSlide = (props: RecipeSlideProps) => {
	const { recipe } = props;
	const [recipeWithDetails, setRecipeWithDetails] = useState<RecipeFromApi | null>(null);

	return (
		<motion.div
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -300, opacity: 0 }}
			key={recipe.label}
			className='relative w-full h-full text-amber-50 overflow-hidden'
		>
			<RecipePopUp activeRecipe={recipeWithDetails} setActiveRecipe={setRecipeWithDetails} />
			<img
				src={recipe.images.LARGE?.url || recipe.images.REGULAR?.url}
				className='w-full h-full object-cover'
			/>
			{props.children}
			<div className='absolute bg-slate-800 top-[70%] w-full h-[30%] opacity-80'>
				<div
					className='w-full h-full relative px-4 py-4 flex flex-col justify-between'
					onClick={() => setRecipeWithDetails(recipe)}
				>
					<RecipeTitle title={recipe.label} />
					<RecipeShortInformation recipe={recipe} />
				</div>
			</div>
		</motion.div>
	);
};

export default RecipeSlide;
