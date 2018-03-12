import { NUTRITIONIX_CONFIG } from '../config/.local.config';
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
}
