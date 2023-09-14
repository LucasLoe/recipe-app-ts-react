import { useState, useEffect } from "react";
import { useUserData } from "../contexts/UserDataContext";
import LayoutRow from "./layouts/LayoutRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const UserQueryDialog = () => {
	const { userData, setUserData } = useUserData();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setSearchQuery(userData.userSettings.lastSearchQuery);
	}, []);

	function handleEnterKey(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			saveAndReturn();
		}
	}

	function saveAndReturn() {
		if (searchQuery != "") {
			setUserData((prevUserData) => {
				return {
					...prevUserData,
					userSettings: {
						...prevUserData.userSettings,
						lastSearchQuery: searchQuery,
					},
				};
			});
		}
	}

	return (
		<>
			<LayoutRow label='Search query:'>
				<input
					className='px-2 py-3 h-6 grow outline outline-amber-50 outline-2 bg-transparent appearance-none rounded text-amber-50'
					value={searchQuery != "" ? searchQuery : ""}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={(e) => handleEnterKey(e)}
				/>
				<FontAwesomeIcon
					onClick={() => saveAndReturn()}
					icon={faArrowRight}
					className='text-amber-50 h-4 outline outline-2 outline-amber-50 p-1  rounded'
				/>
			</LayoutRow>
		</>
	);
};

export default UserQueryDialog;
