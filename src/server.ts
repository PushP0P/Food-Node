import * as SocketIO from 'socket.io';
import { EventsManager } from './managers/events.manager';
import express = require('express');
import Socket = SocketIO.Socket;
import * as https  from 'https';
import { OutgoingHttpHeaders } from 'http';
import { Observer } from 'rxjs/Observer';

export class Server {
	private app: express.Application = express();
	private port: number = 2820;
	private server: https.Server = https.createServer(SERVER_OPTIONS, this.app);
	private socket: SocketIO.Server = require('socket.io')(2820, {
		secure: true,
		transports: ['websocket']
	});
	private eventManager: EventsManager;

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
		this.socket.on('connect', async (socket) => {
			console.log('client connected', socket.id);
			this.eventManager = new EventsManager(socket);
			this.socket.on(
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
