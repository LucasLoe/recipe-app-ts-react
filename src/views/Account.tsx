import { useEffect, useState } from "react";
import ViewLayout from "../components/layouts/ViewLayout";
import { useUserData } from "../contexts/UserDataContext";
import { useDebounce } from "../hooks/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LayoutRow from "../components/layouts/LayoutRow";
import { useView } from "../contexts/ViewContext";
import { GlobalViewKeys } from "../types";

const Account = () => {
	const { setUserData } = useUserData();
	const { setCurrentGlobalView } = useView();
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	useEffect(() => {
		if (debouncedSearchQuery != "") {
			setUserData((prevUserData) => {
				return {
					...prevUserData,
					userSettings: {
						...prevUserData.userSettings,
						lastSearchQuery: debouncedSearchQuery,
					},
				};
			});
		}
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

	function handleEnterKey(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			if (debouncedSearchQuery != "") {
				setUserData((prevUserData) => {
					return {
						...prevUserData,
						userSettings: {
							...prevUserData.userSettings,
							lastSearchQuery: debouncedSearchQuery,
						},
					};
				});
				setCurrentGlobalView(GlobalViewKeys.home);
			}
		}
	}

	return (
		<ViewLayout>
			<div className='flex flex-col justify-start py-2 px-6'>
				<LayoutRow label='Search query:'>
					<input
						className='px-4 py-2 my-2 h-12 grow outline outline-amber-50 outline-2 bg-transparent appearance-none rounded text-amber-50'
						value={searchQuery != "" ? searchQuery : ""}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={(e) => handleEnterKey(e)}
					/>
					<FontAwesomeIcon
						onClick={() => setCurrentGlobalView(GlobalViewKeys.home)}
						icon={faArrowRight}
						className='text-amber-50 h-12 '
					/>
				</LayoutRow>
				<LayoutRow>
					<button
						className='w-fit px-2 py-1 my-2 rounded bg-red-600 text-amber-50'
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
