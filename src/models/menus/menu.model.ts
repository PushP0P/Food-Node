import { FoodProduct } from '../food-product.interface';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function fetchMenuData(): Promise<Map<string, Set<FoodProduct>>> {
	const buffs = await fs.readdir(path.resolve(__dirname , 'html'), 'buffer');
	const docs = buffs.map((doc: Buffer) => {
		return Buffer.from(doc)
			.toString('utf8');
	});
	console.log('doc?', docs.readFile);

	return void 0;
}
// return food product group with category
