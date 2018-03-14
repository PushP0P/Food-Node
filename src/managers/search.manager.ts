import { StoreManager } from './store.manager';
import { RequestEvent } from '../models/request-event.interface';
import { FoodProductInstance } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';

export async function generateReport(requestEvent: RequestEvent): Promise<any> {
	const stores = await StoreManager.foodStore();
	const report: FoodProductInstance | any = await
		stores.findReport(requestEvent.payload.toString());
	if (report) {
		return report;
	}
}


// todo All Food Report Generataions
