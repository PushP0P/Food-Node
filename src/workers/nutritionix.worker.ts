import { NUTRITIONIX_CONFIG } from '../config/.local.config';
import { concatParams } from '../utilities/url.helpers';
import { NutritionixAPIRequestResult, getResponder } from '../utilities/restRequester';

const Nutrient_Config: {[props: string]: any} = NUTRITIONIX_CONFIG;
const API_KEY: string = Nutrient_Config.apiKey;
const APP_ID: string = Nutrient_Config.appId;

export async function nutrientsList(): Promise<NutritionixAPIRequestResult | void> {
	const params: Map<string, string> = new Map<string, string>();
	const hostName: string = Nutrient_Config.endpoints.base;
	const path = concatParams( Nutrient_Config.endpoints.search.instant, params);
	const headers: {} = {
		'x-app-key': API_KEY,
		'x-app-id': APP_ID
	};
	return await getResponder(hostName, path, headers, {})
		.catch((err: any) => console.log('err', err));
}

export async function instantSearch(terms: string): Promise<NutritionixAPIRequestResult | void> {
	const params: Map<string, string> = new Map<string, string>();
	params.set('query', terms);
	const hostName: string = Nutrient_Config.endpoints.base;
	const path = concatParams( Nutrient_Config.endpoints.search.instant, params);
	const headers: {} = {
		'x-app-key': API_KEY,
		'x-app-id': APP_ID
	};
	return await getResponder(hostName, path, headers, {})
		.catch((err: any) => console.log('err', err));
}

export async function itemsSearch(itemPredicates: {
	nix_item_id?: string,
	upc?: string
}): Promise<NutritionixAPIRequestResult> {
	const hostName: string = NUTRITIONIX_CONFIG.endpoints.base;
	const params: Map<string, string> = new Map<string, string>();

	params.set('x-app-id', NUTRITIONIX_CONFIG.appId);
	params.set('x-app-key', NUTRITIONIX_CONFIG.apiKey);

	Object.keys(itemPredicates)
		.forEach(key => {
			params.set(key, itemPredicates[key]);
		});
	const path: string = concatParams(
		`${NUTRITIONIX_CONFIG.endpoints.search.item}`,
		params
	);
	return await getResponder(hostName, path, {}, {});
}
