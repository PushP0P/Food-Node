/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var server_1 = __webpack_require__(2);
	function boot() {
	    server_1.default.bootstrap();
	}
	boot();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var http = __webpack_require__(3);
	var events_manager_1 = __webpack_require__(4);
	var express = __webpack_require__(15);
	var Server = /** @class */ (function () {
	    function Server() {
	        this.app = express();
	        this.server = http.createServer();
	        this.port = 2820;
	        this.socket = __webpack_require__(16)(2820, {
	            secure: true,
	            transports: ['websocket'],
	        });
	        this.init();
	        this.setupWS();
	    }
	    Server.bootstrap = function () {
	        return new Server();
	    };
	    ;
	    ;
	    Server.prototype.setupWS = function () {
	        this.socket.on('connect', function (socket) {
	            console.log('client connected', socket.id);
	            new events_manager_1.EventsManager(socket);
	            socket.on('disconnecting', function (res) {
	                console.log("Client DC'd");
	            });
	        });
	    };
	    Server.prototype.init = function () {
	        this.server = http.createServer(this.app);
	        this.server.listen(this.port, 'localhost');
	    };
	    return Server;
	}());
	exports.Server = Server;
	exports.default = Server;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var search_event_1 = __webpack_require__(5);
	var store_manager_1 = __webpack_require__(6);
	var EventsManager = /** @class */ (function () {
	    function EventsManager(socket) {
	        this.socket = socket;
	        this.StoreManager = new store_manager_1.StoreManager();
	    }
	    EventsManager.prototype.searchEvents = function () {
	        var _this = this;
	        this.socket.on('SEARCH', function (requestEvent, callback) { return __awaiter(_this, void 0, void 0, function () {
	            var _a;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        _a = callback;
	                        return [4 /*yield*/, search_event_1.searchEvents(requestEvent, this.StoreManager)];
	                    case 1:
	                        _a.apply(void 0, [_b.sent()]);
	                        return [2 /*return*/];
	                }
	            });
	        }); });
	    };
	    return EventsManager;
	}());
	exports.EventsManager = EventsManager;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// tslint:disable
	function searchEvents(requestEvent, storeManager) {
	    return __awaiter(this, void 0, void 0, function () {
	        var type, body;
	        return __generator(this, function (_a) {
	            type = requestEvent.type, body = requestEvent.body;
	            switch (type) {
	                case "SEARCH_TERMS":
	            }
	            return [2 /*return*/];
	        });
	    });
	}
	exports.searchEvents = searchEvents;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var sequelizeStatic = __webpack_require__(7);
	var config_1 = __webpack_require__(8);
	var user_table_model_1 = __webpack_require__(9);
	var food_product_table_model_1 = __webpack_require__(10);
	var category_table_model_1 = __webpack_require__(11);
	var review_table_model_1 = __webpack_require__(12);
	var usda_description_table_model_1 = __webpack_require__(13);
	var usda_nutrient_table_model_1 = __webpack_require__(14);
	var StoreManager = /** @class */ (function () {
	    function StoreManager() {
	        this._dbConfig = config_1.DB_CONFIG;
	        this.sequelize = this.dbConfig(this._dbConfig);
	        this.modelsInit();
	        this.syncTables();
	    }
	    StoreManager.prototype.modelsInit = function () {
	        this.User = user_table_model_1.userModel(sequelizeStatic, this.sequelize);
	        this.FoodProduct = food_product_table_model_1.foodProductModel(sequelizeStatic, this.sequelize);
	        this.Category = category_table_model_1.categoryModel(sequelizeStatic, this.sequelize);
	        this.Review = review_table_model_1.reviewModel(sequelizeStatic, this.sequelize);
	        this.Category = category_table_model_1.categoryModel(sequelizeStatic, this.sequelize);
	        this.USDADescription = usda_description_table_model_1.usdaDescriptionModel(sequelizeStatic, this.sequelize);
	        this.USDANutrient = usda_nutrient_table_model_1.usdaNutrientModel(sequelizeStatic, this.sequelize);
	    };
	    StoreManager.prototype.dbConfig = function (config) {
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
	    };
	    StoreManager.prototype.syncTables = function (cb) {
	        if (cb === void 0) { cb = function () {
	        }; }
	        this.sequelize.sync().then(function () {
	            return cb();
	        });
	    };
	    StoreManager.prototype.userTransactions = function (type, payload) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a, userInstance;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        _a = type;
	                        switch (_a) {
	                            case 'CREATE_USER': return [3 /*break*/, 1];
	                            case 'REMOVE_USER': return [3 /*break*/, 3];
	                            case 'UPDATE_USER': return [3 /*break*/, 5];
	                            case 'GET_USER': return [3 /*break*/, 7];
	                        }
	                        return [3 /*break*/, 9];
	                    case 1: return [4 /*yield*/, this.User.create(payload)];
	                    case 2: return [2 /*return*/, _b.sent()];
	                    case 3: return [4 /*yield*/, this.User.destroy(payload)];
	                    case 4: return [2 /*return*/, _b.sent()];
	                    case 5: return [4 /*yield*/, this.User.find(payload.id)];
	                    case 6:
	                        userInstance = _b.sent();
	                        _b.label = 7;
	                    case 7: return [4 /*yield*/, this.User.find(payload)];
	                    case 8: return [2 /*return*/, _b.sent()];
	                    case 9: return [2 /*return*/, Promise.reject('Search Error')];
	                }
	            });
	        });
	    };
	    StoreManager.prototype.foodTransaction = function (type, payload) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        _a = type;
	                        switch (_a) {
	                            case 'NEW_FOOD_PRODUCT': return [3 /*break*/, 1];
	                        }
	                        return [3 /*break*/, 3];
	                    case 1: return [4 /*yield*/, this.USDADescription.create()];
	                    case 2: return [2 /*return*/, _b.sent()];
	                    case 3: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return StoreManager;
	}());
	exports.StoreManager = StoreManager;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("sequelize");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DB_CONFIG = {
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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function userModel(DataTypes, sequelize) {
	    return sequelize.define('user', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4,
	        },
	        hasGoogle: {
	            type: DataTypes.STRING,
	            unique: 'compositeIndex',
	            allowNull: true
	        },
	        hasTwitter: {
	            type: DataTypes.STRING,
	            allowNull: true
	        },
	        hasLocal: {
	            type: DataTypes.STRING,
	            allowNull: true
	        },
	    }, {
	        freezeTableName: true,
	        paranoid: true,
	        underscored: true,
	    });
	}
	exports.userModel = userModel;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function foodProductModel(DataTypes, sequelize) {
	    return sequelize.define('food_product', {
	        ndb_food_number: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4,
	        },
	        food_name: {
	            type: DataTypes.STRING,
	            unique: 'compositeIndex',
	            allowNull: true
	        },
	        short_description: {
	            type: DataTypes.STRING,
	            allowNull: true
	        },
	        is_rated: {
	            type: DataTypes.Boolean,
	            allowNull: true
	        },
	        avg_rating: {
	            type: DataTypes.NUMBER,
	            allowNull: true
	        },
	    }, {
	        freezeTableName: true,
	        paranoid: true,
	        underscored: true,
	    });
	}
	exports.foodProductModel = foodProductModel;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function categoryModel(DataTypes, sequelize) {
	    return sequelize.define('category', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4,
	        },
	        label: {
	            type: DataTypes.STRING,
	            allowNull: true
	        },
	        short_description: {
	            type: DataTypes.STRING,
	            allowNull: true
	        },
	        icon: {
	            type: DataTypes.STRING,
	            allowNull: true
	        },
	    }, {
	        freezeTableName: true,
	        paranoid: true,
	        underscored: true,
	    });
	}
	exports.categoryModel = categoryModel;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function reviewModel(DataTypes, sequelize) {
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
	    }, {
	        freezeTableName: true,
	        paranoid: true,
	        underscored: true,
	    });
	}
	exports.reviewModel = reviewModel;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function usdaDescriptionModel(DataTypes, sequelize) {
	    return sequelize.define('usda_description', {
	        ndbno: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4,
	        },
	        ndb_food_number: {
	            type: DataTypes.STRING
	        },
	        food_name: {
	            type: DataTypes.STRING
	        },
	        short_description: {
	            type: DataTypes.STRING
	        },
	        food_group: {
	            type: DataTypes.STRING
	        },
	        scientific_name: {
	            type: DataTypes.STRING
	        },
	        commercial_name: {
	            type: DataTypes.STRING
	        },
	        manufacture_: {
	            type: DataTypes.STRING
	        },
	    }, {
	        freezeTableName: true,
	        paranoid: true,
	        underscored: true,
	    });
	}
	exports.usdaDescriptionModel = usdaDescriptionModel;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function usdaNutrientModel(DataTypes, sequelize) {
	    return sequelize.define('usda_nutrient', {
	        nutrient_id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4,
	        },
	        nutrient_name: {
	            type: DataTypes.STRING
	        },
	    }, {
	        freezeTableName: true,
	        paranoid: true,
	        underscored: true,
	    });
	}
	exports.usdaNutrientModel = usdaNutrientModel;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("socket.io");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map