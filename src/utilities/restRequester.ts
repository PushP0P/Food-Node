import { IncomingMessage, OutgoingHttpHeaders } from 'http';

export interface NutritionixAPIRequestResult {
	branded: {[props: string]: string}[];
}

export async function getResponder(
	hostName: string, path: string,
	headers: OutgoingHttpHeaders, body: any
	// todo fix any
): Promise<NutritionixAPIRequestResult | any> {
	console.log('getResponder', hostName, path, headers, body);
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	return await <NutritionixAPIRequestResult> await new Promise(
		(resolve, reject): void => {
		const https = require('https');
		// const options: {} = {
		// 	'method': 'GET',
		// 	'hostname': 'api.nal.usda.gov',
		// 	'port': null,
		// 	'path': '/ndb/search?fg=2100&q=pizza&lt=g&format=JSON&api_key=JiiJJlr1FvAcye8lkFIJuy8dFjhZcP2x7PNBEcIQ',
		// };
		const options: {} = {
			method: 'GET',
			protocol: 'https:',
			hostname: hostName,
			port: null,
			path: path,
			headers: headers,
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
			reject(err.toString());
		});
		req.end();
	});
}
