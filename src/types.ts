export enum GlobalViewKeys {
	home = "home",
	recipes = "recipes",
	account = "account",
}

export type LoadingState = {
	status: "loading" | "success" | "failure";
	error: unknown | string;
};

export type Recipe = {
	name: string;
	duration: number;
	additionalInformation: string[];
	price: number;
	img: string;
	url: string;
};

export type UserSettings = {
	allergies: string[];
	dos: string[];
	donts: string[];
	lastSearchQuery: string;
};

export type UserData = {
	username: string;
	userSettings: UserSettings;
	savedRecipes: RecipeFromApi[];
	rejectedRecipes: RecipeFromApi[];
};

export type RecipeFromApi = {
	uri: string;
	label: string;
	image: string;
	images: {
		THUMBNAIL: {
			url: string;
			width: number;
			height: number;
		};
		SMALL: {
			url: string;
			width: number;
			height: number;
		};
		REGULAR: {
			url: string;
			width: number;
			height: number;
		};
		LARGE: {
			url: string;
			width: number;
			height: number;
		};
	};
	source: string;
	url: string;
	shareAs: string;
	yield: number;
	dietLabels: string[];
	healthLabels: string[];
	cautions: string[];
	ingredientLines: string[];
	ingredients: {
		text: string;
		quantity: number;
		measure: string;
		food: string;
		weight: number;
		foodId: string;
	}[];
	calories: number;
	glycemicIndex: number;
	totalCO2Emissions: number;
	co2EmissionsClass: string;
	totalWeight: number;
	cuisineType: string[];
	mealType: string[];
	dishType: string[];
	instructions: string[];
	tags: string[];
	externalId: string;
	totalNutrients: {};
	totalDaily: {};
	digest: [
		{
			label: string;
			tag: string;
			schemaOrgTag: string;
			total: number;
			hasRDI: true;
			daily: number;
			unit: string;
			sub: {};
		}
	];
};

export type DataFromApi = {
	recipe: RecipeFromApi;
	_links: {
		self: {
			href: string;
			title: string;
		};
		next: {
			href: string;
			title: string;
		};
	};
};

export type ResponseFromApi = {
	from: number;
	to: number;
	count: number;
	_links: {
		self: {
			href: string;
			title: string;
		};
		next: {
			href: string;
			title: string;
		};
	};
	hits: DataFromApi[];
};
