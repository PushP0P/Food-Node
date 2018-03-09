import { Sequelize, SequelizeStatic } from 'sequelize';
import { USDADescriptionModel } from './attributes/usda/usda-description.attributes';

export function usdaDescriptionModel(DataTypes: SequelizeStatic, sequelize: Sequelize): USDADescriptionModel {
	return sequelize.define('usda_description', {
		ndbno: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		ndb_food_number: {
			type: DataTypes.STRING
		},
		food_name: {
			type: DataTypes.STRING
		},
		short_description: {
			type: DataTypes.STRING
		},
		food_group: {
			type: DataTypes.STRING
		},
		scientific_name: {
			type: DataTypes.STRING
		},
		commercial_name: {
			type: DataTypes.STRING
		},
		manufacture_: {
			type: DataTypes.STRING
		},
	},
	{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
