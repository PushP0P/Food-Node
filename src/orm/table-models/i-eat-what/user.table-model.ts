import { Sequelize, SequelizeStatic } from 'sequelize';
import { UserModel } from './attributes/i-eat-what/user.attributes';

export function userModel(DataTypes: SequelizeStatic, sequelize: Sequelize): UserModel {
	return sequelize.define('user', {
		uid: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		hasGoogle: {
			type: DataTypes.STRING,
			unique: 'compositeIndex',
			allowNull: true
		},
		hasTwitter: {
			type: DataTypes.STRING,
			allowNull: true
		},
		hasLocal: {
			type: DataTypes.STRING,
			allowNull: true
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
