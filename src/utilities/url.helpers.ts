export function concatParams(base: string, params: Map<string, string>): string {
	let counter = 0;
	let url: string = `${base}?`;

	params.forEach((value, key) => {
		console.log('params', value, key);
		counter === 0
			? url += `${key}=${value.replace(/ /g, '%20')}`
			: url += `&${key}=${value.replace(/ /g, '%20')}`;
		counter++;
	});
	return url;
}
