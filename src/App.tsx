import { useMemo } from "react";
import Home from "./views/Home";
import RecipeCollection from "./views/RecipeCollection";
import Account from "./views/Account";
import { GlobalViewKeys, RecipeFromApi } from "./types";
import { useView } from "./contexts/ViewContext";
import { useRecipeCollection } from "./contexts/RecipeCollectionContext";
import { useUserData } from "./contexts/UserDataContext";
import removeArrayDuplicates from "./functions/removeArrayDuplicates";

function App() {
	const { recipeCollection, setRecipeCollection, loadingState } = useRecipeCollection();
	const { userData } = useUserData();
	const { currentGlobalView } = useView();
	const filteredRecipes = useMemo<RecipeFromApi[]>(() => {
		let interactedRecipes = [...userData.savedRecipes, ...userData.rejectedRecipes];
		return removeArrayDuplicates(recipeCollection, interactedRecipes, "uri");
	}, [userData, recipeCollection]);

	const Views = {
		home: (
			<Home
				recipeCollection={filteredRecipes}
				setRecipeCollection={setRecipeCollection}
				loadingState={loadingState}
			/>
		),
		recipes: <RecipeCollection />,
		account: <Account />,
	} satisfies Record<GlobalViewKeys, JSX.Element>;

	return (
		<div className='bg-slate-700 w-screen h-screen'>
			<div className='max-w-2xl mx-auto h-full bg-red-400'>{Views[currentGlobalView]}</div>
		</div>
	);
}

export default App;
