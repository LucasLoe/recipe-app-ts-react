import getServerParams from "./getServerParams";
export default function getApiUrl(params: { [key: string]: any }, endpoint: string) {
	const { url, app_id, app_key } = getServerParams();
	const queryParams = new URLSearchParams({ app_id, app_key, ...params });

	// const apiUrl = `${url}${endpoint}?${queryParams.toString()}`;
	const apiUrl = url + endpoint;

	return apiUrl;
}
