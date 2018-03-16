<<<<<<< HEAD
export function concatParams(base: string, params: Map<string, string>): string {
	let url: string = `${base}?`;
	params.forEach((value, key) => {
=======
export async function concatParams(base: string, params: Map<string, string>): Promise<string> {
	let url: string = `${base}?`;
	await params.forEach((value, key) => {
>>>>>>> 69abcaee36e9458273ca320cf4727d61c7013767
		url += `&${key}=${value}`;
	});
	return url;
}
