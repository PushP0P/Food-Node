import { packForTransport, RequestEvent } from '../models/request-event.interface';
import { nutrientsList } from '../workers/nutritionix.worker';
import { fullReport } from '../workers/usda.worker';
import { fastFoodItemsByCategory, getFastFoodResults } from '../workers/food.worker';

// tslint:disable
export async function searchEvents(requestEvent: RequestEvent): Promise<any> {
	const {type, body} = requestEvent.payload;
	// console.log('TYPE', requestEvent.event);
	let result;
	switch (type) {
		case"FULL_REPORT":
			result = await fullReport(body)
				.catch((err: {}) => console.log('err', err));
			console.log('result', result);
			return packForTransport(result);
		case"NUTRIENT_LIST":
			result = await nutrientsList()
				.catch((err: {}) => console.log('err', err));
			console.log('result', result);
			return packForTransport(result);
		case"FAST_FOOD":
			result = await getFastFoodResults(body.terms, body.categories)
				.catch((err: {}) => console.log('err', err));
			return packForTransport(result);
		case'FAST_FOOD_FILTER_CATEGORY':
			result = await fastFoodItemsByCategory(body.terms, body.categories)
				.catch((err: {}) => console.log('err', err));
			console.log(result);
			return packForTransport(result);
		default:
			return {ok: false, message: 'Type Error'};
	}
}
