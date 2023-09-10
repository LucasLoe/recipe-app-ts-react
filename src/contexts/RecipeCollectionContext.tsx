import React, { useState, createContext, useContext } from "react";
import { Recipe } from "../types";

type RecipeCollectionProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

// Define RecipeCollectionContext as a context variable
export const RecipeCollectionContext = createContext<
	| {
			recipeCollection: Recipe[];
			setRecipeCollection: React.Dispatch<React.SetStateAction<Recipe[]>>;
	  }
	| undefined
>(undefined);

const RecipeCollectionProvider = (props: RecipeCollectionProviderProps) => {
	const [recipeCollection, setRecipeCollection] = useState<Recipe[]>([]);

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
