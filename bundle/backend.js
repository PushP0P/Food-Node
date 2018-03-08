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
	var service_1 = __webpack_require__(2);
	function boot() {
	    service_1.default.bootstrap();
	}
	boot();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var http = __webpack_require__(3);
	var dbConfig = __webpack_require__(4);
	var express = __webpack_require__(6);
	var Service = /** @class */ (function () {
	    function Service() {
	        this.app = express();
	        this.server = http.createServer();
	        this.port = 2820;
	        this.init();
	        this.setupWS();
	        dbConfig();
	    }
	    Service.bootstrap = function () {
	        return new Service();
	    };
	    ;
	    ;
	    Service.prototype.setupWS = function () {
	    };
	    Service.prototype.init = function () {
	        this.server = http.createServer(this.app);
	        this.server.listen(this.port, 'localhost');
	    };
	    return Service;
	}());
	exports.Service = Service;
	exports.default = Service;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function () {
	    var mongoose = __webpack_require__(5);
	    var db = mongoose.connection;
	    mongoose.connect('mongodb://localhost:27017/foo', {
	        useMongoClient: true
	    });
	    db.on('error', console.error.bind(console, 'connection error'));
	    db.once('open', function () {
	        console.log('Db Connected!');
	    });
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map