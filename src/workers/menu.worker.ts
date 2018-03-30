import * as xlsx from 'xlsx';
import { LOCAL } from '../config/.local.config';
import { FoodProduct } from '../models/food-product.interface';
import { addMenus } from '../managers/update.manager';

export async function initializeMenuStores(): Promise<number>{
	const menusSheets = xlsx.readFile(__dirname + LOCAL.filePaths.MENUS_XLSX);
	const menusMap: Map<string, Set<FoodProduct>> = new Map<string, Set<FoodProduct>>();
	for (let restaurantName of menusSheets.SheetNames) {
		menusMap.set(restaurantName, new Set<FoodProduct>());
		// Already array or JSON string?
		const menus: {}[] = xlsx.utils.sheet_to_json(menusSheets.Sheets[restaurantName]);
		menus.forEach((menu: {}) => {
			let categoryNames: string[] = [];
			let menuCols = Object.keys(menu);

			const foodProduct: FoodProduct = new FoodProduct();

			for (let i = 1; i < Object.keys(menu).length; i++) {
				categoryNames = categoryNames.concat(menuCols[i]);
			}
			foodProduct.foodName = menu[menuCols[0]];

			foodProduct.categories = JSON.stringify(categoryNames);
			foodProduct.brandName = restaurantName;
			menusMap.get(restaurantName).add(foodProduct);
		});

	}
	return await addMenus(menusMap);
}
