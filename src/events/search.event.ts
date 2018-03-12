import { RequestEvent } from '../models/request-event.interface';
import { listByTerms } from '../managers/search.manager';
import { instantSearch } from '../workers/nutritionix.worker';

// tslint:disable
export async function searchEvents(requestEvent: RequestEvent): Promise<any> {
	const {type, body} = requestEvent.payload;
	// console.log('TYPE', requestEvent.event);
	switch (type) {
		case"TERMS_SEARCH":
			return await listByTerms(body);
		case'INSTANT_SEARCH':
			return await instantSearch(body)
				.catch((err: {}) => console.log('err', err));
		default:
			return {ok: false, message: 'Type Error'};
	}
}
