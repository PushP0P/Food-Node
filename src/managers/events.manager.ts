import Socket = SocketIO.Socket;
import { RequestEvent } from '../models/request-event.model';
import { searchEvents } from '../events/search.event';
import { StoreManager } from './store.manager';

export class EventsManager {
	private StoreManager = new StoreManager();

	constructor(private socket: Socket) {
		this.searchEvents();
	}

	private searchEvents(): void {
		this.socket.on(
			'SEARCH',
			async (
				requestEvent: RequestEvent,
				callback: (result: any) => any
			) => {
				callback(
					await searchEvents(
						requestEvent,
						this.StoreManager
					).catch(err => console.log('error events manager', err))
				);
		});
	}
}
