import * as sequelizeStatic from 'sequelize';
import { DBConfig, DB_CONFIG } from '../orm/config';
import { userModel } from '../orm/table-models/i-eat-what/user.table-model';
import { UserAttributes, UserModel } from '../orm/table-models/i-eat-what/attributes/i-eat-what/user.attributes';
import { FoodProductModel } from '../orm/table-models/i-eat-what/attributes/i-eat-what/food-product.attributes';
import { ReviewModel } from '../orm/table-models/i-eat-what/attributes/i-eat-what/review.attributes';
import { CategoryModel } from '../orm/table-models/i-eat-what/attributes/i-eat-what/category.attributes';
import { foodProductModel } from '../orm/table-models/i-eat-what/food-product.table-model';
import { categoryModel } from '../orm/table-models/i-eat-what/category.table-model';
import { reviewModel } from '../orm/table-models/i-eat-what/review.table-model';
import { USDANutrientModel } from '../orm/table-models/usda/attributes/usda/usda-nutrient.attributes';
import { USDADescriptionModel } from '../orm/table-models/usda/attributes/usda/usda-description.attributes';
import { usdaDescriptionModel } from '../orm/table-models/usda/usda-description.table-model';
import { usdaNutrientModel } from '../orm/table-models/usda/usda-nutrient.table-model';

export class StoreManager {

	public sequelize: sequelizeStatic.Sequelize;
	// internal models
	private User: UserModel;
	private FoodProduct: FoodProductModel;
	private Review: ReviewModel;
	private Category: CategoryModel;

	// usda models
	private USDANutrient: USDANutrientModel;
	private USDADescription: USDADescriptionModel;
	private _dbConfig: DBConfig = DB_CONFIG;

	constructor() {
		this.sequelize = this.dbConfig(this._dbConfig);
		this.modelsInit();
		this.syncTables();
	}

	private modelsInit(): void {
		this.User = userModel(sequelizeStatic, this.sequelize);
		this.FoodProduct = foodProductModel(sequelizeStatic, this.sequelize);
		this.Category = categoryModel(sequelizeStatic, this.sequelize);
		this.Review = reviewModel(sequelizeStatic, this.sequelize);
		this.Category = categoryModel(sequelizeStatic, this.sequelize);
		this.USDADescription = usdaDescriptionModel(sequelizeStatic, this.sequelize);
		this.USDANutrient = usdaNutrientModel(sequelizeStatic, this.sequelize);
	}

	private dbConfig(config: DBConfig): sequelizeStatic.Sequelize {
		return new sequelizeStatic(config.database, config.username, config.password, {
			host: config.host,
			dialect: config.dialect,
			pool: {
				max: config.pool.max,
				min: config.pool.min,
				idle: config.pool.idle
			},
			storage: config.storage
		});
	}

	private syncTables(cb: any = () => {
	}): void {
		this.sequelize.sync().then(() => {
			return cb();
		});
	}

	private async userTransactions(type: string, payload?: any): Promise<UserAttributes | number| string | void | null> {

		switch (type) {
			case'CREATE_USER':
				return await this.User.create(payload);
			case'REMOVE_USER':
				return await this.User.destroy(payload);
			case'UPDATE_USER':
				const userInstance = await this.User.find(payload.id);
			case'GET_USER':
				return await this.User.find(payload);
			default:
				return Promise.reject('Search Error');
		}
	}

	private async foodTransaction(type: string, payload?: any) {
		switch (type) {
			case'NEW_FOOD_PRODUCT':
				return await this.USDADescription.create();
		}
	}
}
