import Socket = SocketIO.Socket;
import { RequestEvent } from '../models/request-event.interface';
import { searchEvents } from '../events/search.event';
import { Observable } from '@reactivex/rxjs';
import { FullFoodReport } from '../models/usda-report.interface';
import { generateReport } from './search.manager';

export class EventsManager {

	constructor(private socket: Socket) {
		this.searchEvents();
	}
	private searchEvents(): void {

		this.socket.on('SEARCH', (requestEvent: RequestEvent, callback: (result: any) => any) => {
				searchEvents(requestEvent)
					.catch((err) => console.log('error events manager', err))
					.then(callback);
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
		this.socket.on('CREATE_USER', (requestEvent: RequestEvent, callback: (res: any) => any) => {

		});


	}
}
