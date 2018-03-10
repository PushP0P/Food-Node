export function concatParams(base: string, params: Map<string, string>): string {
	let url: string = `${base}?`;
	params.forEach((value, key) => {
		url += `&${key}=${value}`;
	});
	return url;
}
