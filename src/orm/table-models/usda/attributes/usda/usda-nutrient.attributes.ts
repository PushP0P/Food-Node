import * as Sequelize from 'sequelize';

export interface USDANutrientAttributes{
	nutrient_id: string;
	nutrient_name: string;
}

export interface USDANutrientInstance extends Sequelize.Instance<USDANutrientAttributes>, USDANutrientAttributes {}

export interface USDANutrientModel extends Sequelize.Model<USDANutrientInstance, USDANutrientAttributes> {

}
