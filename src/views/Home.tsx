import ViewLayout from "../components/layouts/ViewLayout";
import { Recipe } from "../types";
import Carousel from "../components/Carousel";

const sampleRecipeOne: Recipe = {
	name: "super duper leckeres Rezept mit einem langen Namen",
	duration: 25,
	price: 23.32,
	additionalInformation: ["vegan", "gluten-free"],
	img: "https://images.unsplash.com/photo-1612204078213-a227dba74093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
	url: "",
};

const sampleRecipeTwo: Recipe = {
	name: "Vegane Hackbällchen",
	duration: 7,
	price: 59.32,
	additionalInformation: ["meat"],
	img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
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
