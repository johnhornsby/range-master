module.exports = {
	entry: "./src/RangeMaster.js",
	output: {
		libraryTarget: "umd",
		path: __dirname + "/dist",
		filename: "range-master.js"
	},
	module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /(dist|lib|node_modules)/,
	      loader: 'babel-loader'
	    }
	  ]
	}
}