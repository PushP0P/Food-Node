import * as SocketIO from 'socket.io';
import { EventsManager } from './managers/events.manager';
import express = require('express');
import Socket = SocketIO.Socket;
import * as https  from 'https';
import { SERVER_OPTIONS } from './config/.local.config';

export class Server {
	private app: express.Application = express();
	private port: number = 2820;
	private server: https.Server = https.createServer(SERVER_OPTIONS, this.app);
	private socket: SocketIO.Server = require('socket.io')(2820, {
		secure: true,
		transports: ['websocket']
	});

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		this.init();
		this.setupWS();
	}

	private setupWS(): void {
		this.socket.on('connect', async (socket: Socket) => {
			console.log('client connected', socket.id);
			await new EventsManager(socket);
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
