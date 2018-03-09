export function usdaNutrientModel(DataTypes, sequelize) {
	return sequelize.define(
		'usda_nutrient',
		{
			nutrient_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			nutrient_name: {
				type: DataTypes.STRING
			},
		},
		{
			freezeTableName: true,
			paranoid: true,
			underscored: true,
		}
	);
}
