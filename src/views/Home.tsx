import ViewLayout from "../components/UI/ViewLayout";
import { RecipeFromApi, LoadingState } from "../types";
import RecipeSlideController from "../components/RecipeSlideController";
import UserQueryDialog from "../components/UserQueryDialog";

type HomeProps = {
	recipeCollection: RecipeFromApi[];
	setRecipeCollection: React.Dispatch<React.SetStateAction<RecipeFromApi[]>>;
	loadingState: LoadingState;
};

type LoadingStateSlideProps = {
	loadingState: LoadingState;
};

const LoadingStateSlide = (props: LoadingStateSlideProps) => {
	return (
		<div className='relative w-full h-full bg-slate-700 flex flex-col justify-center items-center text-lg'>
			{props.loadingState.status === "loading" ? (
				<>
					"Fetching your data... <br /> Please wait..."
				</>
			) : (
				<div className='text-amber-50 w-1/2'>
					<p className='outline outline-2 outline-amber-50 mb-4 py-2 px-4 rounded'>
						{props.loadingState.error as string}
					</p>
					<UserQueryDialog />
				</div>
			)}
		</div>
	);
};

const Home = (props: HomeProps) => {
	const { recipeCollection, setRecipeCollection, loadingState } = props;

	return (
		<>
			<ViewLayout>
				{loadingState.status === "success" ? (
					recipeCollection.length != 0 && (
						<RecipeSlideController
							recipeCollection={recipeCollection}
							setRecipeCollection={setRecipeCollection}
						/>
					)
				) : (
					<LoadingStateSlide loadingState={loadingState} />
				)}
			</ViewLayout>
		</>
	);
};

export default Home;
