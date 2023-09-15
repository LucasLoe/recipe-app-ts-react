import getServerParams from "./getServerParams";
import buildParams from "../functions/buildParams";

export default function getApiUrl(params: { [key: string]: any }, endpoint: string) {
	let apiUrl;
	const { app_id, app_key, app_status, url } = getServerParams();

	if (app_status === "production") {
		const filteredParams = Object.keys(params)
			.filter((key) => params[key].length > 0 && params[key] != "")
			.reduce((result, key) => {
				result[key] = params[key];
				return result;
			}, {} as { [key: string]: any[] });
		const queryParams = buildParams({ app_id, app_key, ...filteredParams });
		console.log(queryParams);
		apiUrl = `${url}${endpoint}?${queryParams.toString()}`;
	} else {
		apiUrl = url + endpoint;
	}

	return apiUrl;
}
