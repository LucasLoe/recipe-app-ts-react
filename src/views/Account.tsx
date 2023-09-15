import ViewLayout from "../components/UI/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import LayoutRow from "../components/UI/LayoutRow";

const Account = () => {
	const { setUserData } = useUserData();

	function clearLocalStorage() {
		setUserData({
			username: "",
			userSettings: {
				allergies: [],
				dos: [],
				donts: [],
				lastSearchQuery: "",
				mealType: "lunch",
				health: [],
			},
			savedRecipes: [],
			rejectedRecipes: [],
		});
	}

	return (
		<ViewLayout>
			<div className='flex flex-col justify-start py-2 px-6'>
				<LayoutRow>
					<button
						className='w-fit mx-auto px-2 py-1 my-2 rounded bg-red-600 text-amber-50'
						onClick={() => clearLocalStorage()}
					>
						Clear Local Storage
					</button>
				</LayoutRow>
			</div>
		</ViewLayout>
	);
};

export default Account;
