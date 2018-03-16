import { StoreManager } from './store.manager';
import { RequestEvent } from '../models/request-event.interface';
import { FoodProductInstance } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import { searchByTerms } from '../workers/usda.worker';

export async function generateReport(requestEvent: RequestEvent): Promise<any> {
	const stores = await StoreManager.foodStore();
	const report: FoodProductInstance | any =
		await stores.findReport(requestEvent.payload.toString());
	if (report) {
		return report;
	}
}

// todo All Food Report Generataions

export async function listByTerms(searchTerms: string): Promise<any> {
	// todo cache and mixin
	const result = await searchByTerms(searchTerms);
	console.log('search lists', result);
	if (!result) {
		return {ok: false, message: 'Search failed'};
	}
	return {ok: true, message: 'Search Successful', body: result};
}
