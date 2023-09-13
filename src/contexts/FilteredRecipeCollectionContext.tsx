import React, { useState, createContext, useContext } from "react";
import { RecipeFromApi } from "../types";
import { useRecipeCollection } from "./RecipeCollectionContext";
import { useUserData } from "./UserDataContext";
import removeArrayDuplicates from "../functions/removeArrayDuplicates";

type FilteredRecipeCollectionProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

// Define RecipeCollectionContext as a context variable
export const FilteredRecipeCollectionContext = createContext<
	| {
			filteredRecipeCollection: RecipeFromApi[];
			setFilteredRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
	  }
	| undefined
>(undefined);

const FilteredRecipeCollectionProvider = (props: FilteredRecipeCollectionProviderProps) => {
	const [filteredRecipeCollection, setFilteredRecipeCollection] = useState<RecipeFromApi[]>([]);
	const { recipeCollection } = useRecipeCollection();
	const { userData } = useUserData();

	const interactedRecipes = [...userData.savedRecipes, ...userData.rejectedRecipes];
	const filteredData = removeArrayDuplicates(recipeCollection, interactedRecipes, "uri");

	setFilteredRecipeCollection(filteredData);

	return (
		<FilteredRecipeCollectionContext.Provider
			value={{ filteredRecipeCollection, setFilteredRecipeCollection }}
		>
			{props.children}
		</FilteredRecipeCollectionContext.Provider>
	);
};

const useFilteredRecipeCollection = () => {
	const context = useContext(FilteredRecipeCollectionContext);

	if (context === undefined) {
		throw new Error("useRecipeCollection must be used within a RecipeCollectionProvider");
	}

	return context;
};

export { FilteredRecipeCollectionProvider, useFilteredRecipeCollection };
