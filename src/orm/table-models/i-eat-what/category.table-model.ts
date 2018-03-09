import { Sequelize, SequelizeStatic } from 'sequelize';
import { CategoryModel } from './attributes/category.attributes';

export function categoryModel(DataTypes: SequelizeStatic, sequelize: Sequelize): CategoryModel {
	return sequelize.define('category', {
		category_id: {
			type: DataTypes.UUIDV4,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		label: {
			type: DataTypes.STRING,
			allowNull: true
		},
		short_description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
