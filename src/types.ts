export enum GlobalViewKeys {
	home = "home",
	recipes = "recipes",
	account = "account",
}

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
};

export type UserData = {
	username: string;
	userSettings: UserSettings;
	savedRecipes: Recipe[];
};
