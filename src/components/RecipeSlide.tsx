import { Recipe } from "../types";

type RecipeSlideProps = {
	recipe: Recipe;
};

type RecipeTitleProps = {
	title: string;
};

type RecipeShortInformationProps = {
	price: number;
	duration: number;
	additionalInformation: string[];
};
const RecipeTitle = (props: RecipeTitleProps) => {
	return <h2 className='text-3xl font-thin my-1 '>{props.title}</h2>;
};

const RecipeShortInformation = (props: RecipeShortInformationProps) => {
	return (
		<div className=' w-full my-1 flex flex-row justify-between items-center text-md'>
			<p className=''>{`${props.duration} min`}</p>
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
			<p className=''>{`${props.price} €`}</p>
		</div>
	);
};

const RecipeSlide = (props: RecipeSlideProps) => {
	const { recipe } = props;
	return (
		<div className='relative w-full h-full text-amber-50'>
			<img src={recipe.img} className='w-full h-full object-cover'></img>
			<a href={recipe.url}>
				<div className='absolute bg-slate-800 top-[70%] w-full h-[30%] opacity-80 px-4 py-4 flex flex-col justify-between'>
					<RecipeTitle title={recipe.name} />
					<RecipeShortInformation
						price={recipe.price}
						duration={recipe.duration}
						additionalInformation={recipe.additionalInformation}
					/>
				</div>
			</a>
		</div>
	);
};

export default RecipeSlide;
