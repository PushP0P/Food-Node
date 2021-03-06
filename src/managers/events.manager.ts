import { RequestEvent } from '../models/request-event.interface';
import { searchEvents } from '../events/search.event';
import SocketIO = require('socket.io');

export class EventsManager {

	constructor(private socket: SocketIO.Socket) {
		this.searchEvents();
		this.userEvents();
	}

	private searchEvents(): void {
		this.socket.on(
			'SEARCH',
			async (requestEvent: RequestEvent,
				callback: ((result: any) => any)
			) => {
				const result = await searchEvents(requestEvent)
					.catch((err) => console.log('error events manager', err));
				callback(result);
		});
	}

	private userEvents(): void {
		this.socket.on(
			'REVIEW',
			(event: any, callback: any) => {
		});

		this.socket.on(
			'ACCOUNT',
			(event: RequestEvent,
			callback: (res: any) => any) => {

		});
	}

	private menuEvents(): void {

		this.socket.on(
			'CREATE',
			(
				event: RequestEvent,
				callback: (res: any) => any
			) => {

		});
	}
}
