import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";

type AccountProps = {};

const Account = (props: AccountProps) => {
	const { userData, setUserData } = useUserData();
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

	const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				userSettings: {
					...prevUserData.userSettings,
					lastSearchQuery: e.target.value,
				},
			};
		});
	};

	return (
		<ViewLayout>
			<div>
				<button
					className='w-fit px-2 py-1 rounded bg-red-600 text-amber-50'
					onClick={() => clearLocalStorage()}
				>
					Clear Local Storage
				</button>
				<input
					className=''
					value={userData.userSettings.lastSearchQuery}
					onChange={(e) => handleSearchQueryChange(e)}
				/>
			</div>
		</ViewLayout>
	);
};

export default Account;
