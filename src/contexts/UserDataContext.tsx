import React, { createContext, useContext } from "react";
import { UserData } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

type UserDataProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

// Define UserDataContext as a context variable
export const UserDataContext = createContext<
	| {
			userData: UserData;
			setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	  }
	| undefined
>(undefined);

const UserDataProvider = (props: UserDataProviderProps) => {
	const [userData, setUserData] = useLocalStorage<UserData>("recipe-app-ts-react", {
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

	return (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			{props.children}
		</UserDataContext.Provider>
	);
};

const useUserData = () => {
	const context = useContext(UserDataContext);

	if (context === undefined) {
		throw new Error("useUserData must be used within a UserDataProvider");
	}

	return context;
};

export { UserDataProvider, useUserData };
