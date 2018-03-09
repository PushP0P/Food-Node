export function reviewModel(DataTypes, sequelize) {
	return sequelize.define('review', {
		review_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		ndbno: {
			type: DataTypes.STRING,
			unique: 'compositeIndex',
			allowNull: true
		},
		text: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rating: {
			type: DataTypes.NUMBER,
			allowNull: true
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: true,
	});
}
