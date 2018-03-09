import { RequestEvent } from '../models/request-event.model';
import { StoreManager } from '../managers/store.manager';

// tslint:disable
export async function searchEvents(requestEvent: RequestEvent, storeManager: StoreManager ): Promise<any> {
	const {type, body} = requestEvent;
	switch (type) {
		case"SEARCH_TERMS":
			// return await StoreManager.something

	}
	return;
}
