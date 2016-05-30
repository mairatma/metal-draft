module.exports = {
	entry: './src/Draft.js',
	output: {
			library: 'Draft',
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
