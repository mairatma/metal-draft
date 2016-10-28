'use strict';

import JSXComponent from 'metal-jsx';

class StyleButton extends JSXComponent {
  created() {
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span class={className} data-onmousedown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default StyleButton;
