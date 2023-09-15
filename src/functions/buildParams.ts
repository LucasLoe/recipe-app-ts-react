import { ApiParams } from "../types";

export default function buildParams(data: ApiParams) {
	const params = new URLSearchParams();

	Object.entries(data).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((value) => params.append(key, value.toString()));
		} else {
			params.append(key, value.toString());
		}
	});

	return params.toString();
}
