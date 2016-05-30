'use strict';

import Draft from './Draft';
import {EditorState, RichUtils} from 'draft-js';
import JSXComponent from 'metal-jsx';

class Test extends JSXComponent {
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

Test.STATE = {
	editorState: {
		value: EditorState.createEmpty()
	}
};

Test.SYNC_UPDATES = true;

export default Test;
