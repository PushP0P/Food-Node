import { FoodProduct } from '../models/food-product.interface';
import { SearchResultsList, ShortReport } from '../models/search.model';
import { fetchMenuData } from '../models/menus/menu.model';
import { groupSearch } from './usda.worker';

/**
 * Find fast food restaurants that match the search terms and filtered
 * by category selections.
 * @param {string} searchTerms
 * @param {string[]} categories
 * @returns {Promise<Set<FoodProduct>>}
 */
export async function getFilteredFastFoodList(searchTerms: string, categories: string[]): Promise<Set<FoodProduct>> {
	const foundFoodProducts: Set<FoodProduct> = new Set<FoodProduct>();
	const noValue: string = 'no value';

	//Search USDA with FastFood and Terms

	const groupSearchResult: SearchResultsList = <SearchResultsList> await groupSearch('Fast Food', searchTerms);
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

	const menus: Map<string, Set<FoodProduct>> = await fetchMenuData();
	const matches: Set<FoodProduct> = new Set<FoodProduct>();
	for (let key of menus.keys()) {
		matches.add(resultsByBrand.get(key));
	}

	return (() => {
		const refined = new Set<FoodProduct>();

		for ( let product of matches.values()) {
			for (let tag of product.tags) {
				if (categories.indexOf(tag) === -1) {
					refined.add(product);
				}
			}
		}

		return refined;
	})();
}
