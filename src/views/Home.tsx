import ViewLayout from "../components/layouts/ViewLayout";
import Carousel from "../components/Carousel";
import getRecipes from "../api/getRecipes";
import { RecipeFromApi } from "../types";
import { useEffect, useState } from "react";
import RecipeSlideController from "../components/RecipeSlideController";
import { useUserData } from "../contexts/UserDataContext";
import removeArrayDuplicates from "../functions/removeArrayDuplicates";

type LoadingState = {
	status: "loading" | "success" | "failure";
	error: unknown | string;
};
const Home = () => {
	const [recipeCollection, setRecipeCollection] = useState<RecipeFromApi[]>([]);
	const { userData } = useUserData();
	const [loadingState, setLoadingState] = useState<LoadingState>({
		status: "loading",
		error: "",
	});

	useEffect(() => {
		async function fetchRecipeData() {
			try {
				const fetchedData = await getRecipes();
				const filteredData = removeArrayDuplicates(fetchedData, userData.savedRecipes, 'uri');
				setRecipeCollection(filteredData);
				setLoadingState({
					status: "success",
					error: undefined,
				});
			} catch (error) {
				console.log(
					`The following error occured while trying to fetch recipe data from the Edamam API: ${error}`
				);
				setLoadingState({
					status: "failure",
					error: error,
				});
			}
		}

		fetchRecipeData();
	}, []);

	return (
		<>
			<ViewLayout>
				{loadingState.status === "success" ? (
					<RecipeSlideController
						recipeCollection={recipeCollection}
						setRecipeCollection={setRecipeCollection}
					/>
				) : (
					<div className='w-full h-full bg-slate-700 flex flex-row justify-center items-center text-2xl'>
						Fetching your data... <br /> Please wait...
					</div>
				)}
			</ViewLayout>
		</>
	);
};

export default Home;
