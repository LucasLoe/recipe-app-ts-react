import { RecipeFromApi } from "../types";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type RecipeSlideProps = {
	recipe: RecipeFromApi;
	children: ReactNode;
};

type RecipeTitleProps = {
	title: string;
};

type RecipeShortInformationProps = {
	type: string[];
	calories: number;
	additionalInformation: string[];
};
const RecipeTitle = (props: RecipeTitleProps) => {
	return <h2 className='text-3xl font-thin my-1 w-fit'>{props.title}</h2>;
};

const RecipeShortInformation = (props: RecipeShortInformationProps) => {
	return (
		<div className=' w-full my-1 flex flex-row justify-between items-center text-md'>
			<p className=''>{`${Math.round(props.calories)} cals`}</p>
			<div>
				{props.additionalInformation &&
					props.additionalInformation.map((elem, idx) => {
						return (
							<span key={idx} className='mx-1 font-thin'>
								{elem}
							</span>
						);
					})}
			</div>
			<p className=''>{`${props.type}`}</p>
		</div>
	);
};

const RecipeSlide = (props: RecipeSlideProps) => {
	const { recipe } = props;

	return (
		<motion.div
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -300, opacity: 0 }}
			key={recipe.label}
			className='relative w-full h-full text-amber-50'
		>
			<img
				src={recipe.images.LARGE?.url || recipe.images.REGULAR?.url}
				className='w-full h-full object-cover'
			></img>
			{props.children}
			<div className='absolute bg-slate-800 top-[70%] w-full h-[30%] opacity-80'>
				<div className='w-full h-full relative px-4 py-4 flex flex-col justify-between'>
					<a className='w-fit' href={recipe.url} target='_blank'>
						<RecipeTitle title={recipe.label} />
					</a>
					<RecipeShortInformation
						type={recipe.mealType}
						calories={recipe.calories}
						additionalInformation={recipe.tags}
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default RecipeSlide;
