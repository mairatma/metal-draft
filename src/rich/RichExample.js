'use strict';

import bridge from 'metal-react';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} from 'draft-js';
import JSXComponent from 'metal-jsx';
import { Map } from 'immutable';

// That's all you have to do to use a React component inside Metal.js. Now you
// can treat it as a regular Metal.js component, and the connection to React
// will be handled automatically for you.
// Draft.js is a bit special though, so it also requires its caller to set the
// `SYNC_UPDATES` flag. Check it out below for more details.
var Draft = bridge(Editor);

/**
 * This is an example of usage that basically renders Draft.js with some
 * buttons that enable rich editing, besides keyboard commands.
 * Note that this follows the same example that can be seen at
 * https://github.com/facebook/draft-js/blob/master/examples/rich/rich.html.
 */
class RichExample extends JSXComponent {
	created() {
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.onChange = this.onChange.bind(this);
		this.toggleBlockType = this.toggleBlockType.bind(this);
		this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
		this.focus = this.focus.bind(this);
	}

	focus() {
		this.components.editor.getInstance().focus();
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
		// If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = this.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div class="RichEditor-root">
        <BlockStyleControls
          editorState={this.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.editorState}
          onToggle={this.toggleInlineStyle}
        />
				<div class={className} data-onclick={this.focus}>
	        <Draft
	          blockStyleFn={getBlockStyle}
	          customStyleMap={styleMap}
	          editorState={this.editorState}
	          handleKeyCommand={this.handleKeyCommand}
	          onChange={this.onChange}
	          placeholder="Tell a story..."
	          ref="editor"
	          spellCheck={true}
	        />
	      </div>
			</div>
    );
	}

	toggleBlockType(blockType) {
		this.onChange(
      RichUtils.toggleBlockType(
        this.editorState,
        blockType
      )
    );
	}

	toggleInlineStyle(inlineStyle) {
		this.onChange(
      RichUtils.toggleInlineStyle(
        this.editorState,
        inlineStyle
      )
    );
	}
}

RichExample.STATE = {
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
RichExample.SYNC_UPDATES = true;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

export default RichExample;
