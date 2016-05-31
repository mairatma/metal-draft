module.exports = {
	entry: './src/Examples.js',
	output: {
			library: 'Examples',
      path: './build',
      filename: 'draft.js'
  },
	module: {
	  loaders: [
	    {
	      test: /\.js?$/,
				exclude: /node_modules/,
	      loader: 'babel',
	      query: {
	        presets: ['es2015', 'metal-jsx']
	      }
	    }
	  ]
	}
};
