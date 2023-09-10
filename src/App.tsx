// import getRecipes from "./api/getRecipes";
import Home from "./views/Home";
import RecipeCollection from "./views/RecipeCollection";
import { GlobalViewKeys } from "./types";
import { useView } from "./contexts/ViewContext";

const Views = {
	home: <Home />,
	recipes: <RecipeCollection />,
	account: <Home />,
} satisfies Record<GlobalViewKeys, JSX.Element>;

function App() {
	const { currentGlobalView } = useView();
	return <>{Views[currentGlobalView]}</>;
}

export default App;
