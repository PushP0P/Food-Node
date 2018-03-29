import { FoodProduct } from '../food-product.interface';
import * as fs from 'fs-extra';
import { JSDOM } from 'jsdom';
import * as Path from 'path';
import { CATEGORIES } from '../category.model';

export interface MenusMap {
	resterauntId: string;
	menu: {[props: string]: any};
}

/**
 * scrapeMenuData() Retrieves all html files form child 'html' dir and
 * builds and initializes a new FoodProduct class.
 * @returns {Promise<Map<string, Set<FoodProduct>>>}
 */
export async function scrapeMenuData(): Promise<Map<string, Set<FoodProduct>>> {

	// HTML Import

	const menus = new Map<string, Set<FoodProduct>>();
	const files = (await fs.readdir(Path.resolve(__dirname, 'html')))
		.map(file => Buffer.from(file).toString('utf8'))
		.filter(file => file !== '.DS_Store');
	const noValue = 'No Value';

	// parse HTML files

	const foodProducts = new Set<FoodProduct>();

	for (let i = 0; i < files.length; i++) {
		const foodProduct = new FoodProduct();
		const fileName = Buffer.from(files[i]).toString();
		const doc: JSDOM = await JSDOM.fromFile(Path.resolve(__dirname, 'html', fileName));
		const window: any = new JSDOM(doc.serialize()).window;
		const rows = window.document.getElementsByTagName('tr');
		const brand = fileName.split('.')[0];

		foodProduct.brandName = brand;
		for (let row of rows) {
			let tags: string[] = [];
			const tds = row.getElementsByTagName('td');

			if (tds.length > 0) {
				console.log('TDs', tds[0].innerHTML);
				foodProduct.foodName = tds[0].innerHTML;
				for (let j = 1; j < CATEGORIES.length + 1; j++) {
					if (row[j]) {
						const ex: string = row[j].innerHTML;
						if (ex === 'x') {
							tags = [...tags, CATEGORIES[j]];
						}
						foodProduct.tags = tags;
					}
				}
				foodProducts.add(foodProduct);
			}
		}
		menus.set(brand, foodProducts);
	}
	console.log('menus', menus);
	return menus;
}
