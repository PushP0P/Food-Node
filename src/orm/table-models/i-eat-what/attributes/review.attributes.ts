import * as Sequelize from 'sequelize';

export interface ReviewAttributes{
	review_id: string;
	ndbno: string;
	text: string;
	rating: number;
	updated_on: number;
}

export interface ReviewInstance extends Sequelize.Instance<ReviewAttributes>, ReviewAttributes{}

export interface ReviewModel extends Sequelize.Model<ReviewInstance, ReviewAttributes> {

}
