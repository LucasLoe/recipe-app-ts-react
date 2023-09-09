import getRecipes from "./api/getRecipes";

function App() {
	getRecipes({ type: "any", q: "chicken", from: 0, to: 10 }).then((data) => {
		console.log(data);
	}).catch;
	return (
		<>
			<div>test</div>
		</>
	);
}

export default App;
