import * as SocketIO from 'socket.io';
import { EventsManager } from './managers/events.manager';
import Socket = SocketIO.Socket;
import * as http from 'http';
import { Observer } from '@reactivex/rxjs';
import { OutgoingHttpHeaders } from 'http';

export class Server {
	private port: number = 2820;
	private server: http.Server = http.createServer();
	private eventManager: EventsManager;
	private socket: SocketIO.Server = require('socket.io')(this.port, {
		secure: true,
		transports: ['websocket'],
	});

	public static bootstrap(): Server {
		return new Server()
	}

	constructor() {
		this.init();
		this.setupWS();
	}

	static restRequester(url: string, headers: OutgoingHttpHeaders, body: any, observer: Observer<any>) {
		console.log('URL', url);
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

	private setupWS(): void {
		this.socket.on('connect', async (socket: Socket) => {
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
		this.server.listen(this.port, 'localhost');
	}
}

export default Server;
