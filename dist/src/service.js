"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var dbConfig = require("./odm/db.config");
var express = require("express");
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
//# sourceMappingURL=service.js.map