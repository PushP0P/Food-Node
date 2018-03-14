import { concatParams } from '../utilities/url.helpers';
import { APIRequestResult, restResponder } from '../utilities/restRequester';
import { USDA_CONFIG } from '../config/.local.config';
import { SearchResultsList } from '../models/search.model';

const usda_config = USDA_CONFIG;

export async function fullReport(ndbno: string): Promise<APIRequestResult | void> {
	const params: Map<string, string> = new Map<string, string>();
	params.set('ndbno', ndbno);
	params.set('lt', 'f');
	params.set('format', 'JSON');
	params.set('api_key', usda_config.apiKey);
	const hostName: string = usda_config.endpoints.base;
	const path = concatParams( usda_config.endpoints.report.item, params);
	return await restResponder(hostName, path, {}, {})
		.catch((err: any) => console.log('err', err));
}

export async function groupSearch(searchTerm: string, foodGroupId: string): Promise<SearchResultsList | void> {
	const params: Map<string, string> = new Map<string, string>();
	params.set('fg', foodGroupId);
	params.set('q', searchTerm);
	params.set('lt', 'fg');
	params.set('format', 'JSON');
	params.set('api_key', usda_config.apiKey);
	const hostName: string = usda_config.endpoints.base;
	const path = concatParams( usda_config.endpoints.report.item, params);
	return await restResponder(hostName, path, {}, {})
		.catch((err: any) => console.log('err', err));
}

export async function searchByTerm(searchTerm: string): Promise<APIRequestResult | void> {
	const params: Map<string, string> = new Map<string, string>();
	params.set('q', searchTerm);
	params.set('lt', 'f');
	params.set('format', 'JSON');
	params.set('api_key', usda_config.apiKey);
	const hostName: string = usda_config.endpoints.base;
	const path = concatParams( usda_config.endpoints.report.item, params);
	return await restResponder(hostName, path, {}, {})
		.catch((err: any) => console.log('err', err));
}
