import { Sequelize, SequelizeStatic } from 'sequelize';
import { FoodProductModel } from './attributes/food-product.attributes';

export function foodProductModel(DataTypes: SequelizeStatic, sequelize: Sequelize): FoodProductModel {
	return sequelize.define('food_product', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		ndbno: {
			type: DataTypes.STRING,
		},
		foodName: {
			type: DataTypes.STRING,
		},
		brandName: {
			type: DataTypes.STRING,
		},
		metadata: {
			type: DataTypes.STRING,
		},
		photo: {
			type: DataTypes.STRING,
		},
		updatedAt: {
			type: DataTypes.STRING,
		},
		categories: {
			type: DataTypes.STRING,
		}
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
