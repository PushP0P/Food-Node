import { FoodProductAttributes } from '../orm/table-models/i-eat-what/attributes/i-eat-what/food-product.attributes';

export interface FoodProduct extends FoodProductAttributes {
	[props: string]: any;

}
