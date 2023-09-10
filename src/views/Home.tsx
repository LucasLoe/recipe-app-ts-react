import ViewLayout from "../components/layouts/ViewLayout";
import { Recipe } from "../types";
import Carousel from "../components/Carousel";

const sampleRecipeOne: Recipe = {
	name: "super duper leckeres Rezept mit einem langen Namen",
	duration: 25,
	price: 23.32,
	additionalInformation: ["vegan", "gluten-free"],
	img: "./src/assets/example1.jpg",
	url: "",
};

const sampleRecipeTwo: Recipe = {
	name: "Hackbällchen",
	duration: 7,
	price: 59.32,
	additionalInformation: ["meat"],
	img: "./src/assets/example2.jpg",
	url: "",
};

const Home = () => {
	const recipeArray: Recipe[] = [sampleRecipeOne, sampleRecipeTwo];
	console.log(recipeArray);
	return (
		<>
			<ViewLayout>
				<Carousel recipes={recipeArray} />
			</ViewLayout>
		</>
	);
};

export default Home;
