import { FoodProductAttributes } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';

export interface FoodProduct extends FoodProductAttributes {
	[props: string]: any;

}
