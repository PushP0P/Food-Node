import Socket = SocketIO.Socket;
import { RequestEvent } from '../models/request-event.interface';
import { searchEvents } from '../events/search.event';
import { FullFoodReport } from '../models/usda-report.interface';
import { generateReport } from './search.manager';
import { Observable } from 'rxjs/Observable';

export class EventsManager {

	constructor(private socket: Socket) {
		this.searchEvents();
	}
	private searchEvents(): void {

		this.socket.on('SEARCH', async (
			requestEvent: RequestEvent,
			callback: ((result: any) => any)) => {
				console.log('SEARCH hit', requestEvent);
				callback(await searchEvents(requestEvent))
					.catch (
						(err) => console.log('error events manager', err)
					);
		});

		this.socket.on('REPORT', (requestEvent: any, callback: any): Observable<FullFoodReport> =>
			callback(searchEvents(requestEvent))
		);

		this.socket.on('LIST', async (requestEvent: RequestEvent, callback: any) => {
			const result = await generateReport(requestEvent);
			callback(result);
		});
	}

	private userEvents(): void {
		this.socket.on(
			'CREATE_USER',
			(
				requestEvent: RequestEvent,
				callback: (res: any) => any) => {

		}
		);
	}
}
