import { Sequelize, SequelizeStatic } from 'sequelize';
import { FoodProductModel } from './attributes/food-product.attributes';

export function foodProductModel(DataTypes: SequelizeStatic, sequelize: Sequelize): FoodProductModel {
	return sequelize.define('food_product', {
		ndbno: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		food_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		short_description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		food_group: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_rated:{
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		avg_rating: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		ingredient_list_desc: {
			type: DataTypes.STRING,
			allowNull: true
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
