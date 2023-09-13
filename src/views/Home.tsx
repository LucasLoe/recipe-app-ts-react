import ViewLayout from "../components/layouts/ViewLayout";
import { RecipeFromApi, LoadingState } from "../types";
import RecipeSlideController from "../components/RecipeSlideController";

type HomeProps = {
	recipeCollection: RecipeFromApi[];
	setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
	loadingState: LoadingState;
};

const Home = (props: HomeProps) => {
	const { recipeCollection, setRecipeCollection, loadingState } = props;

	return (
		<>
			<ViewLayout>
				{loadingState.status === "success" ? (
					recipeCollection.length != 0 ? (
						<RecipeSlideController
							recipeCollection={recipeCollection}
							setRecipeCollection={setRecipeCollection}
						/>
					) : (
						<div className='w-full h-full bg-slate-700 flex flex-row justify-center items-center text-2xl'>
							No (new) results found for the given search query. Try something else!
						</div>
					)
				) : (
					<div className='w-full h-full bg-slate-700 flex flex-row justify-center items-center text-2xl'>
						{loadingState.status === "loading" ? (
							<>
								"Fetching your data... <br /> Please wait..."
							</>
						) : (
							<>
								"Something went wrong... <br /> Please try later again"
							</>
						)}
					</div>
				)}
			</ViewLayout>
		</>
	);
};

export default Home;
