import { FoodProduct } from '../models/food-product.interface';
import { LOCAL } from '../config/.local.config';
import * as Rx from 'rxjs';
import * as xlsx from 'xlsx';

/**
 * sheetsToMapByRestaurantName() takes in a pathway to an xlsx file and returns a Map() of sheets in JSON.
 * @param {string} filePath
 * @returns {Map<string, {[p: string]: any}[]>}
 */
export function sheetsToMapByRestaurantName(filePath: string): Map<string,{[props: string]: any}[]> {
	const response: Map<string, any[]> = new Map<string, any[]>();
	const workbook = xlsx.readFile(__dirname + filePath);
	for (let i = 0; i < workbook.SheetNames.length; i++) {
		const jsonSheet: {[props: string]: any}[] = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

		// set restaurant names to caps and with no spaces to match more easily.
		response.set(
			workbook.SheetNames[i]
				.trim()
				.toUpperCase(),
			jsonSheet
		);
	}
	return response;
}

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

export async function byRestaurantAllergensMenu(
	restaurantName: string,
	categories: string[]
): Promise<Set<FoodProduct>> {

	console.log('name and cate', restaurantName, categories);
	// attempt to mitigate error prone data matching of restaurant names.
	const menus: Map<string, {}[]> = sheetsToMapByRestaurantName(LOCAL.filePaths.MENUS_XLSX);
	const restaurantNameTest: string = restaurantName
		.split(' ')
		.reduce(
			(acc: string, word: string): string => {
				return acc.length > 0
					? acc += ' *' + word
					: acc = word;
			},
			''
		);

	// get key that matches restaurant name
	let keyNames: string[] = [];
	menus.forEach((val, key) => {
		keyNames = keyNames.concat(key);
	});

	const keyName = await Rx.Observable
		.from(keyNames)
		.filter((key: string) => {
			const regexpResult = key.match(new RegExp(restaurantNameTest, 'gi'));
			if (!regexpResult) {
				return false;
			}
			return key.match(new RegExp(restaurantNameTest, 'gi')).length > 0;
		})
		.toPromise();
	console.log('keyName', keyName, menus[0]);
	const restaurantItems: {}[] = menus.get(keyName)
		.filter((item: any) => {
			categories.forEach(
				(category: string) => {
					if (Object.keys(item).indexOf(category) !== -1) {
						// console.log('cate in item', category, item);
						return false;
					}
				});
			return true;
		});
	// console.log('response', restaurantItems);
	return ;
}

export async function fastFoodItemsByCategory(
	terms: string,
	categories: {[category: string]: boolean}
): Promise<FoodProduct[]> {
	const menus: any[] = sheetsToArray(LOCAL.filePaths.MENUS_XLSX);
	console.log(terms, categories);

	// Build regex test string from search terms.
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
	return await menus.reduce(
		(response: any[], menu: {brand: string, items: {}[]}) => {
			const items = menu.items.reduce(
				(itemsResponse: any[], menuItem: {}) => {
					const itemCols: string[] = Object.keys(menuItem);

					// If item contains category, return current accumulation.
					for (let col of itemCols) {
						if (categories[col]) {
							return itemsResponse;
						}
					}
					const match = new RegExp(testString, 'gi').exec(menuItem[itemCols[0]]);
					if (match) {
						let categoryNames: string[] = [];
						const foodProduct = new FoodProduct();

						for (let i = 1; i < itemCols.length; i++) {
							categoryNames = categoryNames.concat(itemCols[i]);
						}
						foodProduct.foodName = menuItem[itemCols[0]];
						foodProduct.categories = categoryNames;
						foodProduct.brandName = menu.brand;
						return itemsResponse.concat(foodProduct);
					}
					return itemsResponse;
				},
				[]
			);
			return response.concat(items);
		},
		[]
	);
}
