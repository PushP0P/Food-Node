import * as Sequelize from 'sequelize';

export interface CategoryAttributes{
	category_id: string;
	label: string;
	short_description: string;
	icon: string;
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes{}

export interface CategoryModel extends Sequelize.Model<CategoryInstance, CategoryAttributes> { }
