import { FoodProduct } from '../models/food-product.interface';
import { SearchResultsList, ShortReport } from '../models/search.model';
import { groupSearch } from './usda.worker';
import { LOCAL } from '../config/.local.config';
import * as Rx from 'rxjs';
import * as xlsx from 'xlsx';
import { stringToTestString } from '../utilities/search.util';

/**
 * Find fast food restaurants that match the search terms and filtered
 * by category selections.
 * @param {string} searchTerms
 * @param {string[]} categories
 * @returns {Promise<Set<FoodProduct>>}
 */
export async function getFastFoodResults(searchTerms: string, categories: {[category: string]: boolean}[]): Promise<FoodProduct[]> {
	// const refined = new Set<FoodProduct>();
	// const matches: Set<FoodProduct> = new Set<FoodProduct>();
	let foundFoodProducts: FoodProduct[] = [];
	// const menus = sheetsToMapByRestaurantName(LOCAL.filePaths.MENUS_XLSX);
	const noValue: string = 'no value';
	// const resultsByBrand = new Map<string, FoodProduct>();

	// Search USDA with FastFood and Terms
	const groupSearchResult: SearchResultsList = <SearchResultsList> await groupSearch(searchTerms, '2100');
	const resultsList: ShortReport[] = groupSearchResult.list.item;

	for (let i = 0; i < resultsList.length; i++) {
		const names = resultsList[i].name.split(',');
		const foodProduct: FoodProduct = new FoodProduct();
		foodProduct.foodName = names[1] || noValue;
		foodProduct.groupName = names[0] || noValue;
		foodProduct.ndbno = resultsList[i].ndbno || noValue;
		foundFoodProducts = foundFoodProducts.concat(foodProduct);
	}

	return foundFoodProducts;

	// foundFoodProducts.forEach((foodProduct: FoodProduct) => {
	// 	const names = foodProduct.foodName.split(',');
	// 	todo Make regexp pattern
		// const brand = names[0].toUpperCase();
		// const name = names[0];
		// foodProduct.foodName = name;
		// foodProduct.brandName = brand;
		// resultsByBrand.set(brand, foodProduct);
	// });

	// Get Menu data and match
	//
	// const menus: Map<string, Set<FoodProduct>> = await fetchMenuData();

	// for (let menu of menus)  {
	// 	matches.add(resultsByBrand.get(key));
	// 	console.log('menu', menu);
	// }
	//
	// for (let product of matches.values()) {
	// 	for (let tag of product.tags) {
	// 		if (categories.indexOf(tag) === -1) {
	// 			refined.add(product);
	// 		}
	// 	}
	// }

	// return refined;
}

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
			return acc.concat(xlsx.utils.sheet_to_json(sheets.Sheets[name]));
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
		(response: any[], menuItem: {}) => {
			const itemCols: string[] = Object.keys(menuItem);

			// If item contains category, return current accumulation.
			for (let col of itemCols) {
				if (categories[col]) {
					return response;
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
				return response.concat(foodProduct);
			}
			return response;
		},
		[]
	);
}
