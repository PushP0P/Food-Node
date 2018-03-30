import * as xlsx from 'xlsx';
import { StoreManager } from '../managers/store.manager';
import {
	FoodProductAttributes,
	FoodProductInstance
} from '../orm/table-models/i-eat-what/attributes/food-product.attributes';

export function sheetsToArray(filePath: string): any[] {
	const sheets = xlsx.readFile(__dirname + filePath);
	return sheets.SheetNames.reduce(
		(acc: any[], name: string) => {
			return acc.concat({
				brand: name,
				items: xlsx.utils.sheet_to_json(sheets.Sheets[name])});
		},
		[]
	);
}

export async function fastFoodItemsByCategory(
	terms: string,
	categories: {[category: string]: boolean}
): Promise<FoodProductAttributes[]> {
	console.log(terms, categories);
	const menus: FoodProductInstance[] = await StoreManager
		.getFoodProducts()
		.all();
	const testString = terms
		.split(' ')
		.reduce(
			(acc: string, term: string, i: number, original: string[]) => {
				return i < original.length - 1
					? acc += `${term}|`
					: acc += `${term})`;
			},
			'('
		);
	// Build regex test string from search terms.
	return await menus
		.reduce(
			(response: FoodProductAttributes[], productInstance: FoodProductInstance) => {
				const menu = (<any> productInstance).dataValues;
				const match = new RegExp(testString, 'gi')
					.exec(menu.foodName);
				if (match) {

					// Parsing because SQLite3 Array is JSONString.
					const categoriesArray: string[] = JSON
						.parse(<string> menu.categories);
					if (Array.isArray(categoriesArray)) {
						categoriesArray.forEach((category: string) => {
							if (!(category in categories)) {

								return response = response.concat(
									{
										...menu,
										categories: JSON.parse(category) || []
									});
							}
						});
					}
				}
				return response;
			},
			[]
		);
}
