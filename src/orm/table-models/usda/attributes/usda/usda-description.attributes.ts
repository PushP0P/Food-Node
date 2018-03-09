import * as Sequelize from 'sequelize';

export interface USDADescriptionAttributes{
	ndb_food_number: string;
	food_name: string;
	short_description: string;
	food_group: string;
	scientific_name: string;
	commercial_name: string;
	manufacture_: string;
	nitrogen_to_protein_conversion_factor: string;
	carbohydrate_factor: string;
	fat_factor: string;
	protein_factor: string;
	refuse: string;
	refuse_description: string;
	database_source: string;
	reporting_unit: string;
}

export interface USDADescriptionInstance extends Sequelize.Instance<USDADescriptionAttributes>, USDADescriptionAttributes{}

export interface USDADescriptionModel extends Sequelize.Model<USDADescriptionInstance, USDADescriptionAttributes> {

}
