import * as Sequelize from 'sequelize';

export interface RestaurantAttributes {
	id?: string;
	name: string;
	logoUrl?: string;
}

export interface RestaurantInstance extends Sequelize.Instance<RestaurantAttributes>, RestaurantAttributes {}

export interface RestaurantModel extends Sequelize.Model<RestaurantInstance, RestaurantAttributes> {}
