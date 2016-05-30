'use strict';

import Component from 'metal-component';
import { Editor } from 'draft-js';
import IncrementalDomRenderer from 'metal-incremental-dom';
import React from 'react';
import ReactDOM from 'react-dom';

class Draft extends Component {
	render() {
		IncrementalDOM.elementOpen('div', null, [], 'class', 'metal-draft-container');
		IncrementalDOM.skip();
		IncrementalDOM.elementClose('div');
	}
}
Draft.RENDERER = IncrementalDomRenderer;

export default Draft;
