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
	      loader: 'babel-loader',
	      query: {
	        presets: ['stage-0', "es2015"],
	        "plugins": ["transform-class-properties"]
	      }
	    }
	  ]
	}
}