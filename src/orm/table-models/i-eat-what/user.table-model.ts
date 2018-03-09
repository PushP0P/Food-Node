import { Sequelize, SequelizeStatic } from 'sequelize';
import { UserModel } from './attributes/user.attributes';

export function userModel(DataTypes: SequelizeStatic, sequelize: Sequelize): UserModel {
	return sequelize.define(
		'user',
		{
			uid: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			fire_base_token: {
				type: DataTypes.STRING,
				unique: 'compositeIndex'
			},
			hasGoogle: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			hasTwitter: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			hasLocal: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
		},{
			freezeTableName: true,
			paranoid: true,
			underscored: true,
		});
}
