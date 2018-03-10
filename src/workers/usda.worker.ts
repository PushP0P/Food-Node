import { USDA_CONFIG } from '../config/.local.config';
import { concatParams } from '../utilities/url.helpers';
import { Observable, Observer } from '@reactivex/rxjs';
import Server from '../server';



export function searchByTerms(searchTerms: string): Observable<any> {
	const params = new Map<string, string>();
	params.set('q', searchTerms);
	params.set('format', 'JSON');
	params.set('api_key', USDA_CONFIG.apiKey);
	const endpoint = `https://${USDA_CONFIG.endpoints.base}/${USDA_CONFIG.endpoints.search}`;
	const url: string = concatParams(endpoint, params);
	return Observable.create((observer: Observer<any>) => {
		Server.restRequester(url, {}, {}, observer);
	});
}

export function getFoodReport(ndbno: string, type: string = 'f'): Observable<any> {
	const params = new Map<string, string>();
	params.set('type', type);
	params.set('ndbno', ndbno);
	params.set('format', 'JSON');
	params.set('api_key', USDA_CONFIG.apiKey);
	const baseURL: string = `https://${USDA_CONFIG.endpoints.base}/${USDA_CONFIG.endpoints.report}`;
	const url: string = concatParams(baseURL, params);
	return Observable.create((observer: Observer<any>) => {
		Server.restRequester(url, {}, {}, observer);
	});
}

export function getList(ndbno: string, listType: string = 'n'): Observable<any> {
	const params = new Map<string, string>();
	params.set('api_key', USDA_CONFIG.apiKey);
	params.set('max', '300');
	params.set('lt', 'n');
	params.set('format', 'JSON');
	const base: string = `https://${USDA_CONFIG.endpoints.base}/${USDA_CONFIG.endpoints.list}`;
	const url: string = concatParams(base, params);
	return Observable.create((observer: Observer<any>) => {
		Server.restRequester(url, {}, {}, observer);
	});
}
