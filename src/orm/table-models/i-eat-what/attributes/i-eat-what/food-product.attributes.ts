import * as Sequelize from 'sequelize';

export interface FoodProductAttributes{
	ndb_food_number: string;
	food_name: string;
	short_description: string;
	food_group: string;
	is_rating: boolean;
	avg_rating: number;
}

export interface FoodProductInstance extends Sequelize.Instance<FoodProductAttributes>, FoodProductAttributes{}

export interface FoodProductModel extends Sequelize.Model<FoodProductInstance, FoodProductAttributes> {

}
