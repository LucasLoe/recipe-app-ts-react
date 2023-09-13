import { useEffect, useState } from "react";
import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import { useDebounce } from "../hooks/useDebounce";

type AccountProps = {};

const Account = (props: AccountProps) => {
	const { userData, setUserData } = useUserData();
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 1000);

	useEffect(() => {
		console.log("debounced");
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				userSettings: {
					...prevUserData.userSettings,
					lastSearchQuery: debouncedSearchQuery,
				},
			};
		});
	}, [debouncedSearchQuery]);

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
			<div className="flex flex-col justify-center items-center">
				<button
					className='w-fit px-2 py-1 my-2 rounded bg-red-600 text-amber-50'
					onClick={() => clearLocalStorage()}
				>
					Clear Local Storage
				</button>
				<input
					className='px-4 py-2 my-2 outline outline-amber-50 outline-2 bg-transparent appearance-none rounded text-amber-50'
					value={searchQuery || userData.userSettings.lastSearchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
		</ViewLayout>
	);
};

export default Account;
