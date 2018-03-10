import { RequestEvent } from '../models/request-event.interface';
import { listByTerms } from '../managers/search.manager';

// tslint:disable
export async function searchEvents(requestEvent: RequestEvent): Promise<any> {
	const {type, body} = requestEvent.payload;
	console.log('TYPE', type);
	switch (type) {
		case"SEARCH_TERMS":
			return await listByTerms(body);
		default:
			return {ok: false, message: 'Type Error'};
	}
}
