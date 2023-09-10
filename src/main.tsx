import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ViewProvider } from "./contexts/ViewContext.tsx";
import { RecipeCollectionProvider } from "./contexts/RecipeCollectionContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RecipeCollectionProvider>
			<ViewProvider>
				<App />
			</ViewProvider>
		</RecipeCollectionProvider>
	</React.StrictMode>
);
