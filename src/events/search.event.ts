import { RequestEvent } from '../models/request-event.interface';
import { listByTerms } from '../managers/search.manager';
import { instantSearch } from '../workers/nutritionix.worker';

// tslint:disable
export async function searchEvents(requestEvent: RequestEvent): Promise<any> {
	const {type, body} = requestEvent.payload;
	console.log('TYPE', type);
	switch (type) {
		case"SEARCH_TERMS":
			return await listByTerms(body);
		case'INSTATE_SEARCH':
			return await instantSearch(body);
		default:
			return {ok: false, message: 'Type Error'};
	}
}
