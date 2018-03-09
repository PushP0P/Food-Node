import { Sequelize, SequelizeStatic } from 'sequelize';
import { USDANutrientModel } from './attributes/usda/usda-nutrient.attributes';

export function usdaNutrientModel(DataTypes: SequelizeStatic, sequelize: Sequelize): USDANutrientModel {
	return sequelize.define(
		'usda_nutrient',
		{
			nutrient_id: {
				type: DataTypes.UUID,
				primaryKey: true,
			},
			nutrient_name: {
				type: DataTypes.STRING
			},
		},
		{
			freezeTableName: true,
			paranoid: true,
			underscored: true,
		}
	);
}
