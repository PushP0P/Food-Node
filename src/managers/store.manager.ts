import * as sequelizeStatic from 'sequelize';
import { DB_CONFIG, DBConfig } from '../orm/config';
import { UserInstance, UserModel } from '../orm/table-models/i-eat-what/attributes/user.attributes';
import { ReviewModel } from '../orm/table-models/i-eat-what/attributes/review.attributes';
import { CategoryModel } from '../orm/table-models/i-eat-what/attributes/category.attributes';
import { FoodProductModel } from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import { userModel } from '../orm/table-models/i-eat-what/user.table-model';
import { foodProductModel } from '../orm/table-models/i-eat-what/food-product.table-model';
import { categoryModel } from '../orm/table-models/i-eat-what/category.table-model';
import { reviewModel } from '../orm/table-models/i-eat-what/review.table-model';

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
	private _dbConfig: DBConfig = DB_CONFIG;

	constructor() {
		this.sequelize = this.dbConfig(this._dbConfig);
		this.modelsInit();
		this.syncTables();
	}

	public async userTransactions(
		type: string,
		payload?: any
	): Promise<UserInstance | [number, UserInstance[]] | number | null> {

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

	private modelsInit(): void {
		this.User = userModel(sequelizeStatic, this.sequelize);
		this.FoodProduct = foodProductModel(sequelizeStatic, this.sequelize);
		this.Category = categoryModel(sequelizeStatic, this.sequelize);
		this.Review = reviewModel(sequelizeStatic, this.sequelize);

		// Set relations
		this.User.hasMany(this.Review);
		this.Review.belongsTo(this.User);
		this.Review.belongsTo(this.FoodProduct);
		this.Category.hasMany(this.FoodProduct);
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

}
