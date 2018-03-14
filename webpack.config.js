var webpack = require('webpack');
var path = require('path');
var fs = require('fs-extra');
var webpackMerge = require('webpack-merge');
// backend

// from http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = { classnames: 'commonjs classnames'};

fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
});

var backendConfig = {
    mode: 'development',
	context: __dirname,
    entry: [
        'main'
    ],

	resolveLoader: {
		moduleExtensions: [
			path.join(__dirname, "node_modules")
		]
	},
	target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    externals: nodeModules,
    plugins: [
    ],
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     loader: 'tslint-loader'
            // },
	        {
                test: /\.ts$/,
                loader: 'ts-loader'
                // loader: 'awesome-typescript-loader'
            }
            // {
            //     test: /bundle\/.*\.js$/,
            //     exclude: /.spec.js/, // excluding .spec files
            //     loader: "uglify"
            // }
        ]
    }
};

var defaultConfig = {
	output: {
		filename: "[name].js",
		libraryTarget: "commonjs",
		library: "",
		path: path.resolve(__dirname, "bundle")
	},
    resolve: {
        extensions: [ ".ts" ],
	    modules: [path.resolve(__dirname, "src"), "node_modules"]  // jshint ignore:line
    },
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    },
};

module.exports = webpackMerge(defaultConfig, backendConfig);
