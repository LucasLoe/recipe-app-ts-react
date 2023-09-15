import React, { useState, createContext, useContext, useEffect, useRef } from "react";
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
	const isFetchingData = useRef(false);

	console.log(userData);

	useEffect(() => {
		async function fetchRecipeData(params = {}) {
			if (isFetchingData.current) {
				return;
			} else {
				try {
					isFetchingData.current = true;
					const fetchedData = await getRecipes(params);
					if (fetchedData.length >= 1) {
						setRecipeCollection(fetchedData);
						setLoadingState({
							status: "success",
							error: undefined,
						});
					} else {
						setRecipeCollection(fetchedData);
						setLoadingState({
							status: "failure",
							error: "Your current search settings provide no results. Try relaxing them",
						});
					}
				} catch (error) {
					console.log(
						`The following error occured while trying to fetch recipe data from the Edamam API: ${error}`
					);
					setLoadingState({
						status: "failure",
						error: error,
					});
				} finally {
					isFetchingData.current = false;
				}
			}
		}
		if (recipeCollection.length < 1 && loadingState.status != "failure") {
			fetchRecipeData({
				type: "public",
				q: userData.userSettings.lastSearchQuery || "food",
				health: userData.userSettings.health.length > 0 ? userData.userSettings.health : [],
				mealType: userData.userSettings.mealType.length > 0 ? userData.userSettings.mealType : [],
				random: true,
			});
			console.log("fetch request triggered");
		}
	}, [userData.userSettings, recipeCollection]);

	useEffect(() => {
		async function fetchRecipeData(params = {}) {
			if (isFetchingData.current) {
				return;
			} else {
				try {
					isFetchingData.current = true;
					const fetchedData = await getRecipes(params);
					if (fetchedData.length >= 1) {
						setRecipeCollection(fetchedData);
						setLoadingState({
							status: "success",
							error: undefined,
						});
					} else {
						setRecipeCollection(fetchedData);
						setLoadingState({
							status: "failure",
							error: "Your current search settings provide no results. Try relaxing them",
						});
					}
				} catch (error) {
					console.log(
						`The following error occured while trying to fetch recipe data from the Edamam API: ${error}`
					);
					setLoadingState({
						status: "failure",
						error: error,
					});
				} finally {
					isFetchingData.current = false;
				}
			}
		}
		fetchRecipeData({
			type: "public",
			q: userData.userSettings.lastSearchQuery || "meal",
			health: userData.userSettings.health.length > 0 ? userData.userSettings.health : [],
			mealType: userData.userSettings.mealType.length > 0 ? userData.userSettings.mealType : [],
			random: true,
		});
		console.log("fetch request triggered");
	}, [userData.userSettings]);

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
