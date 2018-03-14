import { FoodProductAttributes } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import { FoodProduct } from '../models/food-product.interface';
import { groupSearch } from './usda.worker';
import { SearchResultsList, ShortReport } from '../models/search.model';

// Fast Food
export async function getFilteredFastFoodList(searchTerms: string ): Promise<FoodProductAttributes> {
	const foundFoodProducts: Set<FoodProduct> = new Set<FoodProduct>();
	const noValue: string = 'no value';

	//Search USDA with FastFood and Terms

	const groupSearchResult: SearchResultsList = <SearchResultsList> await groupSearch('Fast Food', searchTerms);
	const searchList: ShortReport[] = groupSearchResult.list.item;

	// FF Name = CSV[0]
	for (let i = 0; i < searchList.length; i++) {
		const { group, name, ndbno } = searchList[i];
		foundFoodProducts.add(new FoodProduct()
			.withGroupName(group || noValue)
			.withFoodName(name || noValue)
			.withNdbno(ndbno || noValue));
	}

	// Menu.items && FF

	// Relative List

	// Mix Meta

	// return list

	return void 0;
}

// Packaged
