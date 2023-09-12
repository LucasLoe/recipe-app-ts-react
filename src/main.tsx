import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ViewProvider } from "./contexts/ViewContext.tsx";
import { RecipeCollectionProvider } from "./contexts/RecipeCollectionContext.tsx";
import { UserDataProvider } from "./contexts/UserDataContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<UserDataProvider>
			<RecipeCollectionProvider>
				<ViewProvider>
					<App />
				</ViewProvider>
			</RecipeCollectionProvider>
		</UserDataProvider>
	</React.StrictMode>
);
