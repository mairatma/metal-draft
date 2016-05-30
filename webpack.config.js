module.exports = {
	entry: './src/Example.js',
	output: {
			library: 'Example',
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
