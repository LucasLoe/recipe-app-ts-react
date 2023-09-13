import React, { useState, createContext, useContext } from "react";
import { GlobalViewKeys } from "../types";

type ViewProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

// Define ViewContext as a context variable
export const ViewContext = createContext<
	| {
			currentGlobalView: GlobalViewKeys;
			setCurrentGlobalView: React.Dispatch<React.SetStateAction<GlobalViewKeys>>;
	  }
	| undefined
>(undefined);

const ViewProvider = (props: ViewProviderProps) => {
	const [currentGlobalView, setCurrentGlobalView] = useState<GlobalViewKeys>(GlobalViewKeys.home);

	return (
		<ViewContext.Provider value={{ currentGlobalView, setCurrentGlobalView }}>
			{props.children}
		</ViewContext.Provider>
	);
};

const useView = () => {
	const context = useContext(ViewContext);

	if (context === undefined) {
		throw new Error("useView must be used within a ViewProvider");
	}

	return context;
};

export { ViewProvider, useView };
