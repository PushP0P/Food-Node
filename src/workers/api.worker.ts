import { concatParams } from '../utilities/url.helpers';

export interface ApiWorkerOptions {
	endpoint: string;
	params: Map<string, string>;
}

export var fetch = require('request').defaults({ encoding: null });

export async function fetcher(options: ApiWorkerOptions): Promise<any> {
	const url: string = await concatParams(options.endpoint, options.params);
	return await new Promise((resolve: any, reject: any) => {
		fetch.get(url, (err: any, res: any, body: any) => {
			if (err) {
				reject('Fetch with worker failed. ' + url);
			}
			console.log('hit', new Buffer(body).toString());
			resolve(new Buffer(body).toString());
		});
	});
}
