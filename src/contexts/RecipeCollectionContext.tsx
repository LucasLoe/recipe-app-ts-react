import React, { useState, createContext, useContext, useEffect } from "react";
import { RecipeFromApi } from "../types";
import getRecipes from "../api/getRecipes";

type RecipeCollectionProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

// Define RecipeCollectionContext as a context variable
export const RecipeCollectionContext = createContext<
	| {
			recipeCollection: RecipeFromApi[];
			setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
	  }
	| undefined
>(undefined);

const RecipeCollectionProvider = (props: RecipeCollectionProviderProps) => {
	const [recipeCollection, setRecipeCollection] = useState<RecipeFromApi[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await getRecipes();
				setRecipeCollection(data);
			} catch (error) {
				console.log(`The following error occured while fetching recipe data: ${error}`);
			}
		}
		fetchData();
	}, []);

	return (
		<RecipeCollectionContext.Provider value={{ recipeCollection, setRecipeCollection }}>
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
