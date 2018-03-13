import * as SocketIO from 'socket.io';
import * as http from 'http';
import Socket = SocketIO.Socket;
import { EventsManager } from './managers/events.manager';
import { OutgoingHttpHeaders } from 'http';
import { Observer } from '@reactivex/rxjs/dist/typings/Observer';

export class Server {
	private port: number = 2820;
	private server: http.Server = http.createServer();
	private eventManager: EventsManager;
	private socket: SocketIO.Server = require('socket.io')(this.port, {
		secure: true,
		transports: ['websocket'],
	});

	static bootstrap(): Server {
		return new Server();
	}

	static restRequester(url: string, headers: OutgoingHttpHeaders, body: any, observer: Observer<any>) {
		console.log('restRequest URL', url);
		const https = require('https');
		https.get({
			headers: headers,
			body: body,
			port: 8008,
			rejectUnauthorized: (res) => {}
		}, (res) => {
			observer.next(res);
			res.on('end', (chunk: any) => {
				observer.complete();
			});
			res.on('data', (chunk: any) => {
				observer.next(chunk);
			});
		}).on('error', (error) => {
			observer.error(error);
		}).once('pipe', (data) => {
			console.log('pipe', data);
		});
	}
	constructor() {
		this.init();
		this.setupWS();
	}


	private setupWS(): void {
		console.log('Setting up socket clienocket: Sockett.');
		this.socket.on('connect', async (s) => {
			console.log('client connected', socket.id);
			this.eventManager = new EventsManager(socket);
			socket.on(
			'disconnecting',
			(res: any) => {
				console.log(`Client DC'd`);
			});
		});
	}

	private init(): void {
		this.server.listen(this.port, '127.0.0.1');
		console.log('listening on port', this.port);
	}
}

export default Server;
