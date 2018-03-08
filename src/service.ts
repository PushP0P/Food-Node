import * as http from 'http';
import dbConfig = require('./odm/db.config');
import express = require('express');

export class Service {
	private app: express.Application = express();
	private server: http.Server = http.createServer();
	private port: number = 2820;

	public static bootstrap(): Service {
		return new Service();
	};

	constructor() {
		this.init();
		this.setupWS();
		dbConfig();
	};

	private setupWS(): void {
	}

	private init(): void {
		this.server = http.createServer(this.app);
		this.server.listen(this.port, 'localhost');
	}
}

export default Service;
