import { ApiWorkerOptions, fetcher } from './api.worker';
import { USDA_CONFIG } from '../config/.local.config';

export async function searchByTerms(searchTerms: string): Promise<any> {
	const params = new Map<string, string>();
	params.set('api_key', USDA_CONFIG.apiKey);
	params.set('q', searchTerms);
	params.set('format', 'JSON');

	const options: ApiWorkerOptions = {
		endpoint: `https://${USDA_CONFIG.endpoints.base}/${USDA_CONFIG.endpoints.search}/`,
		params: params
	};
	const result = await fetcher(options);
	console.log('Search result', result);
	return result;
}

export async function getFoodReport(ndbno: string, type: string = 'f'): Promise<any> {
	const params = new Map<string, string>();
	params.set('api_key', USDA_CONFIG.apiKey);
	params.set('type', type);
	params.set('ndbno', ndbno);
	params.set('format', 'JSON');

	const options: ApiWorkerOptions = {
		endpoint: `https://${USDA_CONFIG.endpoints.base}/${USDA_CONFIG.endpoints.report}/`,
		params: params
	};
	const result = await fetcher(options);
	console.log('Report result', result);
	return result;
}

export async function getList(ndbno: string, listType: string = 'n'): Promise<any> {
	const params = new Map<string, string>();
	params.set('api_key', USDA_CONFIG.apiKey);
	params.set('max', '300');
	params.set('lt', 'n');
	params.set('format', 'JSON');
	const options: ApiWorkerOptions = {
		endpoint: `https://${USDA_CONFIG.endpoints.base}/${USDA_CONFIG.endpoints.list}/`,
		params: params
	};
	const result = await fetcher(options);
	console.log('List result for ', result);
	return result;
}
