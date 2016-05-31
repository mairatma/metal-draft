'use strict';

import JSXComponent from 'metal-jsx';

class StyleButton extends JSXComponent {
  created() {
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.config.onToggle(this.config.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.config.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span class={className} data-onmousedown={this.onToggle}>
        {this.config.label}
      </span>
    );
  }
}

export default StyleButton;
