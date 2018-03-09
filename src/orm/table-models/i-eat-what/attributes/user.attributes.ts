import * as Sequelize from 'sequelize';

export interface UserAttributes{
	uid: string;
	fire_base_token: string;
	has_google: boolean;
	has_twitter: boolean;
	has_local: boolean;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {

}
