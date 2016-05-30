'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'draft.css',
	bundleFileName: 'draft.js',
	moduleName: 'metal-draft',
	noSoy: true
});
