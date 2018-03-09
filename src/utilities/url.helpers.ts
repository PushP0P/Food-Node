export async function concatParams(base: string, params: Map<string, string>): Promise<string> {
	let url: string = `${base}?`;
	await params.forEach((value, key) => {
		url += `&${key}=${value}`;
	});
	return url;
}
