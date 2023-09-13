import React, { useState, createContext, useContext, useEffect } from "react";
import { LoadingState, RecipeFromApi } from "../types";
import getRecipes from "../api/getRecipes";
import { useUserData } from "./UserDataContext";

type RecipeCollectionProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

// Define RecipeCollectionContext as a context variable
export const RecipeCollectionContext = createContext<
	| {
			recipeCollection: RecipeFromApi[];
			setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
			loadingState: LoadingState;
	  }
	| undefined
>(undefined);

const RecipeCollectionProvider = (props: RecipeCollectionProviderProps) => {
	const [recipeCollection, setRecipeCollection] = useState<RecipeFromApi[]>([]);
	const { userData } = useUserData();
	const [loadingState, setLoadingState] = useState<LoadingState>({
		status: "loading",
		error: undefined,
	});

	useEffect(() => {
		async function fetchRecipeData(params = {}) {
			console.log(`fetch request fired!`);
			try {
				const fetchedData = await getRecipes(params);
				setRecipeCollection(fetchedData);
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

		fetchRecipeData({
			type: "public",
			q: userData.userSettings.lastSearchQuery || "vegetarian",
			random: true,
		});
	}, []);

	return (
		<RecipeCollectionContext.Provider
			value={{ recipeCollection, setRecipeCollection, loadingState }}
		>
			{props.children}
		</RecipeCollectionContext.Provider>
	);
};

const useRecipeCollection = () => {
	const context = useContext(RecipeCollectionContext);

	if (context === undefined) {
		throw new Error("useRecipeCollection must be used within a RecipeCollectionProvider");
	}

	return context;
};

export { RecipeCollectionProvider, useRecipeCollection };
