import getServerParams from "./getServerParams";
export default function getApiUrl(params: { [key: string]: any }, endpoint: string) {
	let apiUrl;
	const { app_id, app_key, app_status, url } = getServerParams();

	if (app_status === "production") {
		const queryParams = new URLSearchParams({ app_id, app_key, ...params });
		apiUrl = `${url}${endpoint}?${queryParams.toString()}`;
	} else {
		apiUrl = url + endpoint;
	}

	return apiUrl;
}
