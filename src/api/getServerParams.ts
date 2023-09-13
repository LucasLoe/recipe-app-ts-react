export default function getServerParams() {
	let baseUrl;
	//@ts-ignore
	const app_id = import.meta.env.VITE_APP_ID;
	//@ts-ignore
	const app_key = import.meta.env.VITE_APP_KEY;
	//@ts-ignore
	const app_status = import.meta.env.VITE_APP_STATUS;

	if (app_status === "production") {
		baseUrl = "https://api.edamam.com/api/";
	} else {
		baseUrl = "http://localhost:3000/api/";
	}

	return {
		url: baseUrl,
		app_id: app_id,
		app_key: app_key,
		app_status: app_status,
	};
}
