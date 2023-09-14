import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import { RecipeFromApi } from "../types";
import RecipePopUp from "../components/RecipePopUp";
import { useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type RecipePreviewItemProps = {
	recipe: RecipeFromApi;
	activeRecipe: RecipeFromApi | null;
	setActiveRecipe: Dispatch<SetStateAction<RecipeFromApi | null>>;
	deleteRecipe: (e: React.MouseEvent, recipe: RecipeFromApi) => void;
};

const RecipePreviewItem = (props: RecipePreviewItemProps) => {
	const { recipe, setActiveRecipe, deleteRecipe } = props;
	return (
		<div
			onClick={() => setActiveRecipe(props.recipe)}
			className='relative w-[40%] max-w-sm m-2 h-40 rounded-lg text-amber-50 font-light flex flex-col'
		>
			<FontAwesomeIcon
				className='absolute -top-3 -right-3 w-4 h-4 p-2 bg-slate-700 hover:bg-red-400 shadow-xl text-amber-50 z-10 rounded-full '
				icon={faX}
				onClick={(e) => deleteRecipe(e, recipe)}
			/>
			<img src={recipe.images.REGULAR.url} className='w-full h-32 object-cover rounded-t-lg'></img>
			<p className='bg-slate-800 opacity-70 px-2 py-1 text-center overflow-hidden rounded-b-lg'>
				{recipe.label}
			</p>
		</div>
	);
};

const EmptyRecipeCollectionSlide = () => {
	return (
		<div className='w-full h-full bg-slate-500 text-center flex flex-col justify-center px-8'>
			<p className='text-amber-50 text-xl'>
				Your recipe collection is empty.
				<br />
				Try to add some!
			</p>
		</div>
	);
};

const RecipeCollection = () => {
	const { userData, setUserData } = useUserData();
	const recipeCollection = userData.savedRecipes;
	const [activeRecipe, setActiveRecipe] = useState<RecipeFromApi | null>(null);

	function handleDeleteRecipeFromCollection(e: React.MouseEvent, recipeToBeDeleted: RecipeFromApi) {
		e.stopPropagation();
		const updatedRecipes = recipeCollection.filter((rec) => rec != recipeToBeDeleted);
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				savedRecipes: updatedRecipes,
			};
		});
		console.log("delete triggered");
	}

	return (
		<ViewLayout>
			<div className='px-4 py-8 w-full h-full box-border flex flex-col items-center'>
				<RecipePopUp activeRecipe={activeRecipe} setActiveRecipe={setActiveRecipe} />

				{recipeCollection.length !== 0 ? (
					<div className='w-full py-4 flex flex-wrap justify-evenly overflow-y-scroll'>
						{recipeCollection.map((rec, idx) => {
							return (
								<RecipePreviewItem
									recipe={rec}
									activeRecipe={activeRecipe}
									setActiveRecipe={setActiveRecipe}
									deleteRecipe={(e) => handleDeleteRecipeFromCollection(e, rec)}
									key={idx}
								/>
							);
						})}
					</div>
				) : (
					<EmptyRecipeCollectionSlide />
				)}
			</div>
		</ViewLayout>
	);
};

export default RecipeCollection;
