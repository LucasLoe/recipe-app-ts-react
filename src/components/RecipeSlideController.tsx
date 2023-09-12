import { RecipeFromApi } from "../types";
import { useUserData } from "../contexts/UserDataContext";
import RecipeSlide from "./RecipeSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type RecipeSlideControllerProps = {
	recipeCollection: RecipeFromApi[];
	setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
};

type AddToCollectionButtonProps = {
	activeRecipe: RecipeFromApi;
	onClickFunction: (recipe: RecipeFromApi) => void;
};

const AddToCollectionButton = (props: AddToCollectionButtonProps) => {
	return (
		<div className='absolute shadow-2xl top-10 right-4 transform -translate-y-1/2 bg-amber-50 rounded-full w-12 h-12 flex flex-row justify-center items-center'>
			<FontAwesomeIcon
				icon={faHeart}
				className='w-6 h-6 text-red-400'
				onClick={() => props.onClickFunction(props.activeRecipe)}
			/>
		</div>
	);
};

const RecipeSlideController = (props: RecipeSlideControllerProps) => {
	const { userData, setUserData } = useUserData();
	const activeRecipe = props.recipeCollection[0];

	const handleAddToCollection = (recipe: RecipeFromApi) => {
		console.log(recipe);
		if (!userData.savedRecipes.includes(recipe)) {
			setUserData((prevUserData) => {
				return {
					...prevUserData,
					savedRecipes: [...prevUserData.savedRecipes, recipe],
				};
			});
		}
		props.setRecipeCollection((prevRecipeCollection) => {
			return prevRecipeCollection.slice(1);
		});
	};

	return (
		<div className='relative w-full h-full'>
			<RecipeSlide recipe={activeRecipe}>
				<AddToCollectionButton
					activeRecipe={activeRecipe}
					onClickFunction={() => handleAddToCollection(activeRecipe)}
				/>
			</RecipeSlide>
		</div>
	);
};

export default RecipeSlideController;
