export interface DBConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: string;
	pool: {
		max: number;
		min: number;
		idle: number;
	};
	storage: string;
}

export const DB_CONFIG = {
	username: 'rdev',
	password: 'i-eat-what',
	database: 'i_eat_what',
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: './pushP0P.rdev'
};
