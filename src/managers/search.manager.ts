import { searchByTerms } from '../workers/usda.worker';
import { StoreManager } from './store.manager';

export async function listByTerms(searchTerms: string): Promise<any> {
	// todo cache and mixin
	const result = await searchByTerms(searchTerms);
	console.log('search lists', result);
	if (!result) {
		return {ok: false, message: 'Search failed'};
	}
	return {ok: true, message: 'Search Successful', body: result};
}

export async function generateReport(ndbno: string): Promise<any> {
	const stores = await StoreManager.foodStore();
	// const report = await <FoodProductInstance> stores.findReport(ndbno);
	// if (report) {
	// 	return report;
	// }
}
