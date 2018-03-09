import * as http from 'http';
import { EventsManager } from './managers/events.manager';
import express = require('express');
import Socket = SocketIO.Socket;

export class Server {
	private app: express.Application = express();
	private server: http.Server = http.createServer();
	private port: number = 2820;
	private socket: SocketIO.Server = require('socket.io')(2820, {
		secure: true,
		transports: ['websocket'],
	});

	public static bootstrap(): Server {
		return new Server();
	};

	constructor() {
		this.init();
		this.setupWS();
	};

	private setupWS(): void {
		this.socket.on('connect', (socket: Socket) => {
			console.log('client connected', socket.id);
			new EventsManager(socket);

			socket.on('disconnecting', (res: any) => {
				console.log(`Client DC'd`);
			});
		});
	}

	private init(): void {
		this.server = http.createServer(this.app);
		this.server.listen(this.port, 'localhost');
	}
}

export default Server;
