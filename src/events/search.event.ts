import { packForTransport, RequestEvent } from '../models/request-event.interface';
import { fastFoodItemsByCategory } from '../workers/food.worker';

export async function searchEvents(requestEvent: RequestEvent): Promise<any> {
	const {type, body} = requestEvent.payload;

	switch (type) {
		case'FAST_FOOD_FILTER_CATEGORY':
			const fastFoodCategoryResult = await fastFoodItemsByCategory(body.terms, body.categories)
				.catch((err: {}) => console.log('err', err));
			return packForTransport(fastFoodCategoryResult);

		default:
			return {ok: false, message: 'Type Error'};
	}

}
