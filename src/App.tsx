import getRecipes from "./api/getRecipes";
import Home from "./views/Home";
import RecipeCollection from "./views/RecipeCollection";
import Account from "./views/Account";
import { GlobalViewKeys } from "./types";
import { useView } from "./contexts/ViewContext";

const Views = {
	home: <Home />,
	recipes: <RecipeCollection />,
	account: <Account />,
} satisfies Record<GlobalViewKeys, JSX.Element>;

function App() {
	const { currentGlobalView } = useView();
	getRecipes({
		type: "public",
		q: "chicken",
	});
	return (
		<div className='bg-slate-700 w-screen min-h-screen'>
			<div className='max-w-2xl mx-auto shadow-xl'>{Views[currentGlobalView]}</div>
		</div>
	);
}

export default App;
