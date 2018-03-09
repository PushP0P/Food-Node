export function foodProductModel(DataTypes, sequelize) {
	return sequelize.define('food_product', {
		ndb_food_number: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		food_name: {
			type: DataTypes.STRING,
			unique: 'compositeIndex',
			allowNull: true
		},
		short_description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_rated:{
			type: DataTypes.Boolean,
			allowNull: true
		},
		avg_rating: {
			type: DataTypes.NUMBER,
			allowNull: true
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
