module.exports = {
	entry: './src/Test.js',
	output: {
			library: 'Test',
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
