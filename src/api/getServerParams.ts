export default function getServerParams() {
	// const url = "https://api.edamam.com/api/";
	const baseUrl = "http://localhost:3000/api/";
	//@ts-ignore
	const app_id = import.meta.env.VITE_APP_ID;
	//@ts-ignore
	const app_key = import.meta.env.VITE_APP_KEY;

	return {
		url: baseUrl,
		app_id: app_id,
		app_key: app_key,
	};
}
