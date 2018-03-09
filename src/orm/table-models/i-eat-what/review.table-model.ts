import { Sequelize, SequelizeStatic } from 'sequelize';
import { ReviewModel } from './attributes/review.attributes';

export function reviewModel(DataTypes: SequelizeStatic, sequelize: Sequelize): ReviewModel {
	return sequelize.define('review', {
		review_id: {
			type: DataTypes.UUIDV4,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		ndbno: {
			type: DataTypes.STRING,
			allowNull: true
		},
		text: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
