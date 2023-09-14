import { RecipeFromApi } from "../types";
import { useUserData } from "../contexts/UserDataContext";
import RecipeSlide from "./RecipeSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faGear } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useState } from "react";
import { AnimatePresence } from "framer-motion";
import UserPreferencesDialog from "./UserPreferencesDialog";

type RecipeSlideControllerProps = {
	recipeCollection: RecipeFromApi[];
	setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
};

type AlterCollectionButtonProps = {
	activeRecipe: RecipeFromApi;
	onClickFunction: (recipe: RecipeFromApi) => void;
};

type AdjustSettingsButtonProps = {
	onClickFunction: Function;
};

type ButtonRowProps = {
	children: ReactNode | ReactNode[];
};

const ButtonRow = (props: ButtonRowProps) => {
	return (
		<div className='px-2 bg-slate-800 bg-opacity-70 rounded-full absolute right-2 top-2 flex flex-col justify-evenly items-center shadow-2xl'>
			{props.children}
		</div>
	);
};

const AddToCollectionButton = (props: AlterCollectionButtonProps) => {
	return (
		<div className='mt-2 mb-3 shadow-2xl bg-amber-50 rounded-full w-12 h-12 flex flex-row justify-center items-center'>
			<FontAwesomeIcon
				icon={faHeart}
				className='w-6 h-6 text-red-400'
				onClick={() => props.onClickFunction(props.activeRecipe)}
			/>
		</div>
	);
};

const AdjustSettingsButton = (props: AdjustSettingsButtonProps) => {
	return (
		<div className='relative mt-2 mb-3 shadow-2xl bg-amber-50 rounded-full w-12 h-12 flex flex-row justify-center items-center'>
			<FontAwesomeIcon
				icon={faGear}
				className='w-6 h-6 text-red-400'
				onClick={() => props.onClickFunction()}
			/>
		</div>
	);
};

const RejectRecipeButton = (props: AlterCollectionButtonProps) => {
	return (
		<div className='mt-3 mb-2 opacity-70 shadow-2xl bg-none outline outline-red-400 outline-2 rounded-full w-12 h-12 flex flex-row justify-center items-center'>
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
	const [modalIsVisible, setModalIsVisible] = useState(false);

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

	function toggleModalVisibility() {
		setModalIsVisible((prev) => !prev);
	}

	return (
		<AnimatePresence>
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
						<AdjustSettingsButton
							onClickFunction={() => toggleModalVisibility()}
						></AdjustSettingsButton>
						<UserPreferencesDialog isVisible={modalIsVisible} setIsVisible={setModalIsVisible} />
					</ButtonRow>
				</RecipeSlide>
			</div>
		</AnimatePresence>
	);
};

export default RecipeSlideController;
