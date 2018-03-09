export function userModel(DataTypes, sequelize) {
	return sequelize.define('user', {
		id: {
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
