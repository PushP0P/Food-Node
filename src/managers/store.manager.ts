import * as sequelizeStatic from 'sequelize';
import { DB_CONFIG, DBConfig } from '../orm/config';
import { UserInstance, UserModel } from '../orm/table-models/i-eat-what/attributes/user.attributes';
import {
	FoodProductAttributes,
	FoodProductInstance,
	FoodProductModel
} from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import {
	ReviewModel
} from '../orm/table-models/i-eat-what/attributes/review.attributes';
import { CategoryModel } from '../orm/table-models/i-eat-what/attributes/category.attributes';
import { userModel } from '../orm/table-models/i-eat-what/user.table-model';
import { foodProductModel } from '../orm/table-models/i-eat-what/food-product.table-model';
import { categoryModel } from '../orm/table-models/i-eat-what/category.table-model';
import { reviewModel } from '../orm/table-models/i-eat-what/review.table-model';
import {
	USDANutrientInstance,
	USDANutrientModel
} from '../orm/table-models/usda/attributes/usda/usda-nutrient.attributes';
import { USDADescriptionModel } from '../orm/table-models/usda/attributes/usda/usda-description.attributes';
import { usdaDescriptionModel } from '../orm/table-models/usda/usda-description.table-model';
import { usdaNutrientModel } from '../orm/table-models/usda/usda-nutrient.table-model';

export class StoreManager {
	public sequelize: sequelizeStatic.Sequelize;
	static storeManager(): StoreManager {
		return new StoreManager();
	}
	// internal models
	private User: UserModel;
	private FoodProduct: FoodProductModel;
	private Review: ReviewModel;
	private Category: CategoryModel;

	// usda models
	private USDANutrient: USDANutrientModel;
	private USDADescription: USDADescriptionModel;
	private _dbConfig: DBConfig = DB_CONFIG;

	static foodStore = () => {
		const storeManager = new StoreManager();
		return {
			newFoodProd: async (foodProps: FoodProductAttributes) => await storeManager
				.foodTransactions('NEW_FOOD_PRODUCT', foodProps),
			updateFoodProd: async (foodProps: FoodProductAttributes) => await storeManager
				.foodTransactions('NEW_FOOD_PRODUCT', foodProps),
			findReport: async (ndbno: string) => await storeManager.foodTransactions('FIND_REPORT', ndbno),
		};
	}
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
		this.USDADescription = usdaDescriptionModel(sequelizeStatic, this.sequelize);
		this.USDANutrient = usdaNutrientModel(sequelizeStatic, this.sequelize);

		// Set relations
		this.User.hasMany(this.Review);
		this.Review.belongsTo(this.User);
		this.Review.belongsTo(this.FoodProduct);
		this.Category.hasMany(this.FoodProduct);
		this.FoodProduct.hasMany(this.USDANutrient);
		this.FoodProduct.hasOne(this.USDADescription);
		this.USDADescription.belongsTo(this.FoodProduct);
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

	public async userTransactions(type: string, payload?: any): Promise<UserInstance | [number, UserInstance[]] | number | null> {
		switch (type) {
			case'CREATE_USER':
				return await this.User.create(payload);
			case'REMOVE_USER':
				return await this.User.destroy(payload);
			case'UPDATE_USER':
				return await this.User.update(payload.values, payload.options);
			case'GET_USER':
				return await this.User.find(payload);
			default:
				return await Promise.reject('User Error');
		}
	}

	public async foodTransactions(
		type: string, payload?: any
	): Promise<USDANutrientInstance
		| [number, USDANutrientInstance[]]
		| FoodProductInstance
		| [number, FoodProductInstance[]]
		| number
		| boolean
		| null> {

		switch (type) {
			case'NEW_FOOD_PRODUCT':
				return await this.FoodProduct.create();
			case'UPDATE_FOOD_PRODUCT':
				return await this.FoodProduct.update(payload.values, payload.options);
			case'FIND_REPORT':
				return await this.FoodProduct.find(payload);
			case'UPDATE_NUTRIENTS':
				return await this.USDANutrient.insertOrUpdate(payload);
			default:
				return await Promise.reject('Food Error');
		}
	}
}
