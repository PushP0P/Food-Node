import { StoreManager } from './store.manager';
import { FoodProduct } from '../models/food-product.interface';
import { FoodProductAttributes } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
export type menuMap = Map<string, Set<FoodProduct>>;

const store = StoreManager.updateFoodStores();

export async function addMenus(menus: menuMap): Promise<number> {
	menus.forEach(async (foodProducts: Set<FoodProduct>, restaurantName: string) => {
		let response: FoodProductAttributes[] = [];
		if (store.upsertRestaurant({name: restaurantName})) {

			foodProducts.forEach((value: FoodProduct) => {
				const foodProduct: FoodProductAttributes = {
					...new FoodProduct(),
					...value,
					brandName: restaurantName,
					// to JSON string for sqlite3 storage of array.
					categories: JSON.stringify(value.categories)
				};

				response = response.concat(foodProduct);
			});
			const result = await store.createFoodProducts(response);

			if (result.length === foodProducts.size) {
				return result;
			} else {
				return Promise.reject('Error: Some items were not stored.');
			}
		}
	});
	return 1;
}

