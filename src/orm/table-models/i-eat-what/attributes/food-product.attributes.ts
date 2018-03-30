import * as Sequelize from 'sequelize';

export interface FoodProductAttributes {
	id?: string;
	foodName: string;
	brandName: string;
	metadata?: string;
	photo?: string;
	updatedAt?: string | number | Date;
	categories: string | string[];
}

export interface FoodProductInstance extends Sequelize.Instance<FoodProductAttributes>, FoodProductAttributes {}

export interface FoodProductModel extends Sequelize.Model<FoodProductInstance, FoodProductAttributes> {}
