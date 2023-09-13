import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import { RecipeFromApi } from "../types";
type RecipeCollectionProps = {};
type RecipePreviewItemProps = {
	recipe: RecipeFromApi;
};

const RecipePreviewItem = (props: RecipePreviewItemProps) => {
	const { recipe } = props;
	return (
		<div className='relative grow w-[40%] max-w-sm h-40 mx-2 my-4 overflow-hidden rounded-lg text-amber-50 font-light'>
			<img src={recipe.images.REGULAR.url} className='relative w-full h-32 object-cover'></img>
			<p className='bottom-4 h-8 bg-slate-800 opacity-70 px-2 py-1'>{recipe.label}</p>
		</div>
	);
};

const RecipeCollection = (props: RecipeCollectionProps) => {
	const { userData } = useUserData();
	const recipeCollection = userData.savedRecipes;
	console.log(props);
	return (
		<ViewLayout>
			{recipeCollection.length != 0 ? (
				<div className='w-full h-full bg-slate-500 flex flex-row flex-wrap justify-around px-2 py-8 overflow-y-scroll'>
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
