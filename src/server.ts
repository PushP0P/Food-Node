import * as https from 'https';
import { EventsManager } from './managers/events.manager';
import { SERVER_CONFIG } from './config/.local.config';
import *  as SocketIO from 'socket.io';
import { byRestaurantAllergensMenu, fastFoodItemsByCategory } from './workers/food.worker';

export class Server {

	private port: number = 4123;

	private server: https.Server = https.createServer({
		key: SERVER_CONFIG.key,
		cert: SERVER_CONFIG.cert,
		passphrase: SERVER_CONFIG.passphrase,
	}, (req, res) => {
		res.on('data', (chunk: any) => {
			console.log('DATA for Res', chunk);
		});
	});

	private eventManager: EventsManager;
	private socket: SocketIO.Server = require('socket.io')(this.port, {
		secure: true,
		transports: ['websocket']
	});

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		this.init();
		this.setupWS();
		// fastFoodItemsByCategory('Burger', {Eggs: true})
		// 	.then((result) => console.log('allergen menu done'))
		// 	.catch((err) => console.log('allergen menu error', err));
	}

	private setupWS(): void {
		this.socket.on('connect', async (socket) => {
			console.log('client connected', socket.id);
			this.eventManager = new EventsManager(socket);
			socket.on(
				'disconnecting',
				() => {
					console.log(`Client DC'd`);
				});
		});
	}

	private init(): void {
		this.server.listen(this.port, 'localhost');
		console.log('server listening on', this.port);
		process.on('uncaughtException', function (err: any) {
			console.log('uncaught', err);
		});
	}
}

export default Server;
