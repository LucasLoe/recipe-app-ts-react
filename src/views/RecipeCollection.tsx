import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import { RecipeFromApi } from "../types";

type RecipePreviewItemProps = {
	recipe: RecipeFromApi;
};

const RecipePreviewItem = (props: RecipePreviewItemProps) => {
	const { recipe } = props;
	return (
		<a
			href={recipe.url}
			target='_blank'
			className='relative w-[40%] max-w-sm m-2 h-40 overflow-hidden rounded-lg text-amber-50 font-light flex flex-col'
		>
			<img src={recipe.images.REGULAR.url} className='w-full h-32 object-cover'></img>
			<p className='bg-slate-800 opacity-70 px-2 py-1 text-center'>{recipe.label}</p>
		</a>
	);
};

const RecipeCollection = () => {
	const { userData } = useUserData();
	const recipeCollection = userData.savedRecipes;

	return (
		<ViewLayout>
			{recipeCollection.length !== 0 ? (
				<div className='w-full bg-slate-500 flex flex-wrap justify-evenly px-4 py-8 overflow-y-scroll'>
					{recipeCollection.map((rec, idx) => {
						return <RecipePreviewItem key={idx} recipe={rec} />;
					})}
				</div>
			) : (
				<div className='w-full h-full bg-slate-500 text-center flex flex-col justify-center px-8'>
					<p className='text-amber-50 text-xl'>
						Your recipe collection is empty.
						<br />
						Try to add some!
					</p>
				</div>
			)}
		</ViewLayout>
	);
};

export default RecipeCollection;
