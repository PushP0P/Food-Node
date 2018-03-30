import { RequestEvent } from '../models/request-event.interface';
import { fastFoodItemsByCategory } from '../workers/food.worker';
import { addMenus } from '../managers/update.manager';

export async function searchEvents(requestEvent: RequestEvent): Promise<any> {
	const {type, body} = requestEvent.payload;

	switch (type) {
		default:
			return {ok: false, message: 'Type Error'};
	}

}
