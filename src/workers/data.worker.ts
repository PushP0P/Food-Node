import { FoodProductAttributes } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import { FullFoodReport} from '../models/usda-report.model';
import { FoodProduct } from '../models/food-product.model';

// WIP
export function createProductWithReport(usdaReport: FullFoodReport, ): FoodProductAttributes {

	// grab report parts we want
	const { ndbno, name, sd, group, cn, manu } = usdaReport.desc;


	// scan for qualified categories against nutrient list


	const foodProduct: FoodProduct = {
		ndbno: ndbno,
		categories: '',
		food_group: group || 'no data',
		food_name: name || 'no data',
		manufacture_name: manu || 'no data',
		short_description: sd || 'no data',
		common_name: cn || 'no data',
		scientific_name: sd || 'no data',
		is_rated: false,
		avg_rating: -1,
		ingredient_list_desc: usdaReport.ing.desc,
		nutrients: usdaReport.nutrients || [],
		in_categories: []
	};


	// attach qualified categories

	// scan for product type

	// switch dependent on group
	switch (usdaReport.desc.group) {
		case "american indian/alaska native foods":

		case "baby foods":

		case "branded food products database":
			// foodItemBuilder.withUpc(extractUPC(description.name));
			// if (values.length > 2) {
			// 	foodItemBuilder.withManu(values[1]);
			// 	foodItemBuilder.withName(values[1]);
			// 	return foodItemBuilder.build();
			// } else {
			// 	foodItemBuilder.withName(values[0]);
			// }
		case "baked products":

		case "beef products":

		case "beverages":

		case "breakfast cereals":

		case "cereal grains and pasta":

		case "dairy and egg products":

		case "fast foods":

		case "fats and oils":

		case "finfish and shellfish products":

		case "fruits and fruit juices":

		case "lamb, veal, and game products":

		case "legumes and legume products":

		case "meals, entrees, and side dishes":

		case "nut and seed products":

		case "pork products":

		case "poultry products":

		case "restaurant foods":

		case "sausages and luncheon meats":

		case "snacks":

		case "soups, sauces, and gravies":

		case "spices and herbs":

		case "sweets":

		case "vegetables and vegetable products":

		default:
			return foodProduct;
	}
}
