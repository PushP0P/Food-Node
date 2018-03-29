export function categoriesToStrings(categories: {[category: string]: boolean}): string[] {
	return Object.keys(categories).reduce(
		(acc, category) => {
			return categories[category]
				? acc.concat(category)
				: acc;
		},
		[]
	);
}

export function stringToTestString(test: string): string {
	return test
		.split(' ')
		.reduce(
			(acc: string, word: string): string => {
				return acc.length > 0
					? acc += ' *' + word
					: acc = word;
			},
			''
		);
}
