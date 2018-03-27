import { FoodProduct } from '../models/food-product.interface';
import { SearchResultsList, ShortReport } from '../models/search.model';
import { groupSearch } from './usda.worker';
import { LOCAL } from '../config/.local.config';
import * as Rx from 'rxjs';
import * as xlsx from 'xlsx';

/**
 * Find fast food restaurants that match the search terms and filtered
 * by category selections.
 * @param {string} searchTerms
 * @param {string[]} categories
 * @returns {Promise<Set<FoodProduct>>}
 */
export async function getFilteredFastFoodList(searchTerms: string, categories: string[]): Promise<Set<FoodProduct>> {
	const refined = new Set<FoodProduct>();
	const matches: Set<FoodProduct> = new Set<FoodProduct>();
	const foundFoodProducts: Set<FoodProduct> = new Set<FoodProduct>();
	const menus = sheetsToMap(LOCAL.filePaths.MENUS_XLSX);
	const noValue: string = 'no value';

	//Search USDA with FastFood and Terms

	const groupSearchResult: SearchResultsList = <SearchResultsList> await groupSearch(searchTerms, '2100');
	const resultsList: ShortReport[] = groupSearchResult.list.item;

	for (let i = 0; i < resultsList.length; i++) {
		const {group, name, ndbno} = resultsList[i];
		const foodProduct: FoodProduct = new FoodProduct();
		foodProduct.foodName = name || noValue;
		foodProduct.groupName = group || noValue;
		foodProduct.ndbno = ndbno || noValue;
	}

	const resultsByBrand = new Map<string, FoodProduct>();
	foundFoodProducts.forEach((foodProduct: FoodProduct) => {
		const names = foodProduct.foodName.split(',');

		// todo Make regexp pattern
		const brand = names[0].toUpperCase();
		const name = names[0];
		foodProduct.foodName = name;
		foodProduct.brandName = brand;
		resultsByBrand.set(brand, foodProduct);
	});

	// Get Menu data and match
	//
	// const menus: Map<string, Set<FoodProduct>> = await fetchMenuData();

	for (let menu of menus)  {
		// matches.add(resultsByBrand.get(key));
		console.log('menu', menu);
	}

	for ( let product of matches.values()) {
		for (let tag of product.tags) {
			if (categories.indexOf(tag) === -1) {
				refined.add(product);
			}
		}
	}

	return refined;
}

/**
 * sheetsToMap() takes in a pathway to an xlsx file and returns a Map() of sheets in JSON.
 * @param {string} filePath
 * @returns {Map<string, {[p: string]: any}[]>}
 */
export function sheetsToMap(filePath: string): Map<string,{[props: string]: any}[]> {
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

export async function restaurantMenuWithOutCategories(
	restaurantName: string,
	categories: string[]
): Promise<Set<FoodProduct>> {

	console.log('name and cate', restaurantName, categories);
	// attempt to mitigate error prone data matching of restaurant names.
	const menus: Map<string, {}[]> = sheetsToMap(LOCAL.filePaths.MENUS_XLSX);
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
	console.log('keyNAme', keyName, menus[0]);
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
