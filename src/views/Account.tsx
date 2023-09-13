import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";

type AccountProps = {};

const Account = (props: AccountProps) => {
	const { setUserData } = useUserData();
	console.log(props);

	function clearLocalStorage() {
		setUserData({
			username: "",
			userSettings: {
				allergies: [],
				dos: [],
				donts: [],
				lastSearchQuery: "",
			},
			savedRecipes: [],
			rejectedRecipes: [],
		});
	}
	return (
		<ViewLayout>
			<div>
				<button
					className='w-fit px-2 py-1 rounded bg-red-600 text-amber-50'
					onClick={() => clearLocalStorage()}
				>
					Clear Local Storage
				</button>
			</div>
		</ViewLayout>
	);
};

export default Account;
