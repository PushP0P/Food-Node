import * as sequelizeStatic from 'sequelize';
import { DB_CONFIG, DBConfig } from '../orm/config';
import { UserInstance, UserModel } from '../orm/table-models/i-eat-what/attributes/user.attributes';
import { ReviewModel } from '../orm/table-models/i-eat-what/attributes/review.attributes';
import { CategoryModel } from '../orm/table-models/i-eat-what/attributes/category.attributes';
import {
	FoodProductAttributes,
	FoodProductInstance,
	FoodProductModel
} from '../orm/table-models/i-eat-what/attributes/food-product.attributes';
import { userModel } from '../orm/table-models/i-eat-what/user.table-model';
import { foodProductModel } from '../orm/table-models/i-eat-what/food-product.table-model';
import { categoryModel } from '../orm/table-models/i-eat-what/category.table-model';
import { reviewModel } from '../orm/table-models/i-eat-what/review.table-model';
import {
	RestaurantAttributes,
	RestaurantInstance,
	RestaurantModel
} from '../orm/table-models/i-eat-what/attributes/restaurant.attributes';
import { restaurantModel } from '../orm/table-models/i-eat-what/restaurant.table-model';

interface UpdateFoodStores {
	createFoodProducts(foodProducts: FoodProductAttributes[]): Promise<FoodProductInstance[]>;

	createFoodProduct(foodProduct: FoodProductAttributes): Promise<FoodProductInstance>;

	addRestaurant(restaurantProps: RestaurantAttributes): Promise<RestaurantInstance>;

	updateRestaurant(restaurantProps: RestaurantAttributes): Promise<[number, RestaurantInstance[]]>;

	upsertRestaurant(restaurantProps: RestaurantAttributes): Promise<boolean>;
}


interface GetFoodProducts {
	byBrand(brand: string): Promise<FoodProductInstance[]>;

	all(): Promise<FoodProductInstance[]>;
}

export class StoreManager {
	public sequelize: sequelizeStatic.Sequelize;
	// internal models
	private User: UserModel;
	private FoodProduct: FoodProductModel;
	private Review: ReviewModel;
	private Category: CategoryModel;
	private Restaurant: RestaurantModel;
	private _dbConfig: DBConfig = DB_CONFIG;

	static storeManager(): StoreManager {
		return new StoreManager();
	}

	static getFoodProducts(): GetFoodProducts {
		const storeManager = this.storeManager();

		return {
			async byBrand(brand: string): Promise<FoodProductInstance[]> {
				return await storeManager.FoodProduct.findAll({where: {brandName: brand}});
			},
			async all(): Promise<FoodProductInstance[]> {
				return await storeManager.FoodProduct.findAll();
			}
		};
	}

	static updateFoodStores(): UpdateFoodStores {
		const storeManager = this.storeManager();

		return {
			async createFoodProducts(foodProducts: FoodProductAttributes[]): Promise<FoodProductInstance[]> {
				return await storeManager.FoodProduct.bulkCreate(foodProducts);
			},
			async createFoodProduct(foodProduct: FoodProductAttributes): Promise<FoodProductInstance> {
				return await storeManager.FoodProduct.create(foodProduct);
			},
			async addRestaurant(restaurantProps: RestaurantAttributes): Promise<RestaurantInstance> {
				return await storeManager.Restaurant.create(restaurantProps);
			},
			async updateRestaurant(restaurantProps: RestaurantAttributes): Promise<[number, RestaurantInstance[]]> {
				return await storeManager.Restaurant.update(restaurantProps, {where: {id: restaurantProps.id}});
			},
			async upsertRestaurant(restaurantProps: RestaurantAttributes): Promise<boolean> {
				return await storeManager.Restaurant.upsert(restaurantProps);
			}

	};
	}

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
				return await this.sequelize.transaction((transaction) => {
					return this.User.create(payload, {transaction: transaction});
				});
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
		this.Restaurant = restaurantModel(sequelizeStatic, this.sequelize);

		// Set relations
		this.User.hasMany(this.Review);
		this.Review.belongsTo(this.User);
		this.Review.belongsTo(this.FoodProduct);
		this.Category.hasMany(this.FoodProduct);
		this.Restaurant.hasMany(this.FoodProduct);
		this.FoodProduct.belongsTo(this.Restaurant);
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
