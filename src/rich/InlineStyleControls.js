'use strict';

import StyleButton from './StyleButton';

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (config) => {
  var currentStyle = config.editorState.getCurrentInlineStyle();
  return (
    <div class="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={config.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default InlineStyleControls;
