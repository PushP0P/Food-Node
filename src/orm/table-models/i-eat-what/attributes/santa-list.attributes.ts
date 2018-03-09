import * as Sequelize from 'sequelize';

export interface SantaListAttributes {
	id: string;
	categoryId: string;
	good: string[];
	bad: string[];
}

export interface SantaListInstance extends Sequelize.Instance<SantaListAttributes>, SantaListAttributes {}

export interface SantaListModel extends Sequelize.Model<SantaListInstance, SantaListAttributes> {

}
