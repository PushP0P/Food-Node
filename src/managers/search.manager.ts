import { searchByTerms } from '../workers/usda.worker';
import { StoreManager } from './store.manager';
import { RequestEvent } from '../models/request-event.interface';
import { FoodProductInstance } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import { FullFoodReport } from '../models/usda-report.interface';
import { USDANutrientInstance } from '../orm/table-models/usda/attributes/usda/usda-nutrient.attributes';

export async function listByTerms(searchTerms: string): Promise<any> {
	// todo cache and mixin
	const result = await searchByTerms(searchTerms).toPromise();
	console.log('search lists', result);
	if (!result) {
		return {ok: false, message: 'Search failed'};
	}
	return {ok: true, message: 'Search Successful', body: JSON.parse(result)};
}

export async function generateReport(requestEvent: RequestEvent): Promise<any> {
	const stores = await StoreManager.foodStore();
	const report: FoodProductInstance | any = await stores.findReport(requestEvent.payload.toString());
	if (report) {
		return report;
	}
}
