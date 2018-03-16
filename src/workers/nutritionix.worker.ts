import { NUTRITIONIX_CONFIG } from '../config/.local.config';
<<<<<<< HEAD
import { NutritionixItem } from '../models/nutritionix-item.interface';
import { concatParams } from '../utilities/url.helpers';
import { Observable, Observer } from '@reactivex/rxjs';
import Server from '../server';

const Nutrient_Config: {[props: string]: any} = NUTRITIONIX_CONFIG;
const API_KEY: string = Nutrient_Config.apiKey;
const APP_ID: string = Nutrient_Config.appId;

export function instantSearch(terms: string): Promise<NutritionixItem[]> {

	const params: Map<string, string> = new Map();
	params.set('query', terms);
	const urlType: string = Nutrient_Config.endpoints.search.instant;
	const url = `https://${concatParams( Nutrient_Config.endpoints.search.base + urlType, params)}`;

	return Observable.create((observer: Observer<NutritionixItem[]>) => {
		Server.restRequester(
			url,
			{
				'x-app-key': API_KEY,
				'x-app-id': APP_ID
			},
			{},
			observer
		);
	}).toPromise();
}

export function itemSearch(itemPredicates: {
	nix_item_id?: string,
	upc?: string
}): Observable<NutritionixItem> {
	const params: Map<string, string> = new Map<string, string>();
	params.set('x-app-id', NUTRITIONIX_CONFIG.appId);
	params.set(' x-app-key', NUTRITIONIX_CONFIG.apiKey);
	Object.keys(itemPredicates)
		.forEach(key => {
			params.set(key, itemPredicates[key]);
		});
	const url: string  = concatParams(
		`${NUTRITIONIX_CONFIG.endpoints.base}${NUTRITIONIX_CONFIG.endpoints.search.item}`,
		params
	);
	return Observable.create((observer: Observer <NutritionixItem>) => {
		Server.restRequester(url, {}, {}, observer);
	});
=======
import { fetcher } from './api.worker';
import { NutritionixItemModel } from '../models/nutritionix-item.model';

const base = NUTRITIONIX_CONFIG.endpoints.base;

export async function instantSearch(terms: string): Promise<NutritionixItemModel[]> {
	// tslint:disable-next-line
	let url: string = ``;
	const instant = NUTRITIONIX_CONFIG.endpoints.search.instant;
	const query = `?query=${terms}`;
	const urlParts: string[] = [base, instant, query];
	for (let part of urlParts) {
		url += part;
	}
	return await fetcher({
		endpoint: url

	});
}

export async function itemSearch(nutrixItemId: string): Promise<void> {

	// const url: string = `${NUTRITIONIX_CONFIG.endpoints.base}${NUTRITIONIX_CONFIG.endpoints.search.item}/item?nutrix_item_id=${nutrixItemId}`
	return ;
>>>>>>> 69abcaee36e9458273ca320cf4727d61c7013767
}
