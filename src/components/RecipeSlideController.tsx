import { RecipeFromApi } from "../types";
import { useUserData } from "../contexts/UserDataContext";
import RecipeSlide from "./RecipeSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type RecipeSlideControllerProps = {
	recipeCollection: RecipeFromApi[];
	setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
};

type AlterCollectionButtonProps = {
	activeRecipe: RecipeFromApi;
	onClickFunction: (recipe: RecipeFromApi) => void;
};

type ButtonRowProps = {
	children: ReactNode | ReactNode[];
};

const ButtonRow = (props: ButtonRowProps) => {
	return (
		<div className='p-2 bg-slate-800 opactiy-70 rounded-full absolute right-2 top-2 flex flex-col justify-evenly items-center shadow-2xl'>
			{props.children}
		</div>
	);
};

const AddToCollectionButton = (props: AlterCollectionButtonProps) => {
	return (
		<div className='my-2 shadow-2xl bg-amber-50 rounded-full w-12 h-12 flex flex-row justify-center items-center'>
			<FontAwesomeIcon
				icon={faHeart}
				className='w-6 h-6 text-red-400'
				onClick={() => props.onClickFunction(props.activeRecipe)}
			/>
		</div>
	);
};

const RejectRecipeButton = (props: AlterCollectionButtonProps) => {
	return (
		<div className='my-2 opacity-70 shadow-2xl bg-none outline outline-red-400 outline-2 rounded-full w-12 h-12 flex flex-row justify-center items-center'>
			<FontAwesomeIcon
				icon={faTrash}
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
		if (!userData?.savedRecipes?.includes(recipe)) {
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

	const handleRejectRecipe = (recipe: RecipeFromApi) => {
		if (!userData?.rejectedRecipes?.includes(recipe)) {
			setUserData((prevUserData) => {
				return {
					...prevUserData,
					rejectedRecipes: [...prevUserData.rejectedRecipes, recipe],
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
				<ButtonRow>
					<AddToCollectionButton
						activeRecipe={activeRecipe}
						onClickFunction={() => handleAddToCollection(activeRecipe)}
					/>
					<RejectRecipeButton
						activeRecipe={activeRecipe}
						onClickFunction={() => handleRejectRecipe(activeRecipe)}
					/>
				</ButtonRow>
			</RecipeSlide>
		</div>
	);
};

export default RecipeSlideController;
