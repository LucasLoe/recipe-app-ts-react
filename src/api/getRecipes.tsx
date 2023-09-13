import { DataFromApi, RecipeFromApi, ResponseFromApi } from "../types";
import getApiUrl from "./getApiUrl";

async function getRecipes(params = {}): Promise<RecipeFromApi[]> {
	const apiUrl = getApiUrl(params, "recipes/v2");
	try {
		const response = await fetch(apiUrl);

		if (response.ok) {
			const data: ResponseFromApi = await response.json();
			const recipeData: RecipeFromApi[] = data?.hits?.map((e: DataFromApi) => e.recipe);
			return recipeData;
		} else {
			throw new Error(`Request failed with status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

export default getRecipes;
