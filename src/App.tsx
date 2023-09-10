// import getRecipes from "./api/getRecipes";
import Home from "./views/Home";
import { GlobalViewKeys } from "./types";
import { useView } from "./contexts/ViewContext";

const Views = {
	home: <Home />,
	recipes: <Home />,
	account: <Home />,
} satisfies Record<GlobalViewKeys, JSX.Element>;

function App() {
	const { currentGlobalView } = useView();
	return <>{Views[currentGlobalView]}</>;
}

export default App;
