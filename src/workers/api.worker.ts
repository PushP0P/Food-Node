import { concatParams } from '../utilities/url.helpers';
import * as https from 'https';
import * as http from 'http';

export interface ApiWorkerOptions {
	endpoint: string;
	params?: Map<string, string>;
}

export async function fetcher(options: ApiWorkerOptions): Promise<any> {
	const url: string = await concatParams(
		options.endpoint,
		<Map<string, string>> options.params
	);
	return await new Promise(
		(resolve: any, reject: any) => {
			let response;
			https.request({
				// move
				headers: {
					'x-app-id': '30a9b7e1',
					'x-app-key': '373e6d7107146c525db94be8eb016fb4'
				},
				path: url,
			},
			(res: http.IncomingMessage) => {
			res.on('error', (err) => {
				reject('Error fetching from API' + err);
			});

			res.on('data', (data) => {
					response += data;
			});

			res.on('close', () => {
				resolve(response);
			});
		});
	});
}
