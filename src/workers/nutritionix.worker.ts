import { NUTRITIONIX_CONFIG } from '../config/.local.config';
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
}
