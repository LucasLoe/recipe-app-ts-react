import ViewLayout from "../components/layouts/ViewLayout";
import { Recipe } from "../types";
type RecipeCollectionProps = {};
type RecipePreviewItemProps = {
	recipe: Recipe;
};

const sampleRecipeOne: Recipe = {
	name: "super duper leckeres Rezept mit einem langen Namen",
	duration: 25,
	price: 23.32,
	additionalInformation: ["vegan", "gluten-free"],
	img: "./src/assets/example1.jpg",
	url: "",
};

const sampleRecipeTwo: Recipe = {
	name: "Hackbällchen",
	duration: 7,
	price: 59.32,
	additionalInformation: ["meat"],
	img: "./src/assets/example2.jpg",
	url: "",
};

const RecipePreviewItem = (props: RecipePreviewItemProps) => {
	const { recipe } = props;
	return (
		<div className='relative grow w-[40%] max-w-sm h-40 mx-2 my-4 overflow-hidden rounded-lg text-amber-50 font-light'>
			<img src={recipe.img} className='relative w-full h-32 object-cover'></img>
			<p className='bottom-4 h-8 bg-slate-800 opacity-70 px-2 py-1'>{recipe.name}</p>
		</div>
	);
};

const RecipeCollection = (props: RecipeCollectionProps) => {
    console.log(props)
	const recipeArray: Recipe[] = [
		sampleRecipeOne,
		sampleRecipeTwo,
		sampleRecipeOne,
		sampleRecipeTwo,
		sampleRecipeOne,
		sampleRecipeTwo,
		sampleRecipeOne,
		sampleRecipeTwo,
		sampleRecipeOne,
	];

	return (
		<ViewLayout>
			<div className='w-full h-full bg-slate-500 flex flex-row flex-wrap justify-around px-2 py-8 overflow-y-scroll'>
				{recipeArray.map((rec, idx) => {
					return <RecipePreviewItem key={idx} recipe={rec} />;
				})}
			</div>
		</ViewLayout>
	);
};

export default RecipeCollection;
