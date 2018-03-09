export function categoryModel(DataTypes, sequelize) {
	return sequelize.define('category', {
		id: {
			type: DataTypes.UUID,
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
