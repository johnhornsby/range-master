var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		app:["./src/main.js"]
	},
	output: {
		path: __dirname + "/js",
		filename: "app.js"
	},
	node: { fs: "empty" },
	resolve: {
		alias: {
			"range-dog": './RangeDog',
			// "unidragger": "rangemaster/dev/node_modules/unidragger/unidragger"
		},
		root: '/Users/johnhornsby/work/research and development/'
		// fallback: ['/Users/johnhornsby/work/research and development/rangemaster/node_modules/']
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(css|node_modules|scss)/,
				loader: 'babel-loader'
			},
			{
				test: /node_modules\/unidragger/,
				loader: 'imports?define=>undefined'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
}