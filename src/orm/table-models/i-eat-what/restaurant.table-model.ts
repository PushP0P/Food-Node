import { Sequelize, SequelizeStatic } from 'sequelize';
import { RestaurantModel } from './attributes/restaurant.attributes';

export function restaurantModel(DataTypes: SequelizeStatic, sequelize: Sequelize): RestaurantModel {
	return sequelize.define('restaurant', {
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		}
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
