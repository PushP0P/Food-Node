import { IncomingMessage, OutgoingHttpHeaders } from 'http';

export interface APIRequestResult {
	branded: {[props: string]: string}[];
}

export async function restResponder(
	hostName: string, path: string,
	headers: OutgoingHttpHeaders, body: any
	// todo fix any
): Promise<APIRequestResult | any> {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	return await <APIRequestResult> await new Promise(
		(resolve, reject): void => {
		const https = require('https');
		const options: {} = {
			'method': 'GET',
			'hostname': hostName,
			'port': null,
			'path': path,
			'headers': headers,
		};
		const req = https.request(
			options,
			function(res: IncomingMessage) {
			const chunks = [];
			res.on('data', function (chunk: any) {
				chunks.push(chunk);
			});
			res.on(
				'end',
				function() {
				const result: Buffer = Buffer.concat(chunks);
				resolve(JSON.parse(result.toString()));
			});
		});
		req.on('error', (err) => {
			reject(err);
		});
	req.end();
	});
}
