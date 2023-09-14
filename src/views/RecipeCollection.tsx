import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import { RecipeFromApi } from "../types";
import RecipePopUp from "../components/RecipePopUp";
import { useState, Dispatch, SetStateAction } from "react";

type RecipePreviewItemProps = {
	recipe: RecipeFromApi;
	activeRecipe: RecipeFromApi | null;
	setActiveRecipe: Dispatch<SetStateAction<RecipeFromApi | null>>;
};

const RecipePreviewItem = (props: RecipePreviewItemProps) => {
	const { recipe } = props;
	return (
		<div
			onClick={() => props.setActiveRecipe(props.recipe)}
			className='relative w-[40%] max-w-sm m-2 h-40 overflow-hidden rounded-lg text-amber-50 font-light flex flex-col'
		>
			<img src={recipe.images.REGULAR.url} className='w-full h-32 object-cover'></img>
			<p className='bg-slate-800 opacity-70 px-2 py-1 text-center'>{recipe.label}</p>
		</div>
	);
};

const RecipeCollection = () => {
	const { userData } = useUserData();
	const recipeCollection = userData.savedRecipes;
	const [activeRecipe, setActiveRecipe] = useState<RecipeFromApi | null>(null);

	return (
		<ViewLayout>
			<div className='px-4 py-8 w-full box-border flex flex-col items-center'>
				<RecipePopUp activeRecipe={activeRecipe} setActiveRecipe={setActiveRecipe} />

				{recipeCollection.length !== 0 ? (
					<div className='w-full bg-slate-500 flex flex-wrap justify-evenly overflow-y-scroll'>
						{recipeCollection.map((rec, idx) => {
							return (
								<RecipePreviewItem
									recipe={rec}
									activeRecipe={activeRecipe}
									setActiveRecipe={setActiveRecipe}
									key={idx}
								/>
							);
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
			</div>
		</ViewLayout>
	);
};

export default RecipeCollection;
