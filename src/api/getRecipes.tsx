async function getRecipes(params = {}) {
	const url = "https://api.edamam.com/api/recipes/v2";

	//@ts-ignore
	const app_id = import.meta.env.VITE_APP_ID;
	//@ts-ignore
	const app_key = import.meta.env.VITE_APP_KEY;
	// Construct the query parameters including credentials
	const queryParams = new URLSearchParams({ app_id, app_key, ...params });

	// Append the query parameters to the URL
	const apiUrl = `${url}?${queryParams.toString()}`;

	try {
		// Send a GET request to the API endpoint
		const response = await fetch(apiUrl);

		// Check if the request was successful (status code 200)
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error(`Request failed with status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

export default getRecipes;
