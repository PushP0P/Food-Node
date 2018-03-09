import * as Sequelize from 'sequelize';

export interface FoodProductAttributes {
	ndbno: string;
	food_name: string;
	short_description: string;
	food_group: string;
	is_rated: boolean;
	avg_rating: number;
	ingredient_list_desc: string;
	categories: string;
}

export interface FoodProductInstance extends Sequelize.Instance<FoodProductAttributes>, FoodProductAttributes {}

export interface FoodProductModel extends Sequelize.Model<FoodProductInstance, FoodProductAttributes> {}
