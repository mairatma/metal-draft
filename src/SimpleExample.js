'use strict';

import bridge from 'metal-react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import JSXComponent from 'metal-jsx';

// That's all you have to do to use a React component inside Metal.js. Now you
// can treat it as a regular Metal.js component, and the connection to React
// will be handled automatically for you.
// Draft.js is a bit special though, so it also requires its caller to set the
// `SYNC_UPDATES` flag. Check it out below for more details.
var Draft = bridge(Editor);

/**
 * This is an example of usage that basically renders Draft.js and enables
 * some key shortcuts for rich text editing.
 */
class SimpleExample extends JSXComponent {
	created() {
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
	}

	onChange(editorState) {
		this.editorState = editorState;
	}

	render() {
		return <Draft
      editorState={this.editorState}
			handleKeyCommand={this.handleKeyCommand}
      onChange={this.onChange}
    />;
	}
}

SimpleExample.STATE = {
	editorState: {
		value: EditorState.createEmpty()
	}
};

/**
 * Metal.js updates the ui asyncronously after state changes by default. This
 * should be fine for most React components, but Draft.js relies on the
 * synchronous updates, probably due to its undo/redo logic. Setting this flag
 * to true makes everything work as expected, making sure that Drag.js doesn't
 * miss any editor state change due to batching.
 */
SimpleExample.SYNC_UPDATES = true;

export default SimpleExample;
