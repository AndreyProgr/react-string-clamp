import React, { PureComponent } from 'react';

import StrClamper from './utils';

class TextClamp extends PureComponent {
  constructor() {
    super();
    this.state = {
      clampedText: ''
    };
    this.textContainer = React.createRef();
    this.handleResize = this.checkForResize.bind(this);
    window.qqq = this;
  }

  render() {
    const { styles, element, onClick } = this.props;
    const { clampedText } = this.state;
    return React.createElement(element || typeof element !== 'string' ? element : 'div', {
      ref: this.textContainer,
      style: { ...styles, display: 'block' },
      onClick
    }, clampedText);
  }

  componentDidMount() {
    window.aaa = StrClamper;
    setTimeout(() => {
      this.clampText();
    }, 5);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  checkForResize() {
    const { containerWidth } = this.state;
    const actualWidth = this.textContainer.current.clientWidth;
    if (containerWidth !== actualWidth) {
      this.setState({
        containerWidth: actualWidth
      });
      this.clampText();
    }
  }

  clampText() {
    if (!this) {
      return;
    }
    const {
      text, lines, ellipsis, splitter, punctuation, gap, reverse,
      prefix, punctuationChars, punctuaionCharsAdditional
    } = this.props;
    if (!text) {
      return;
    }

    const additionalPunctuationChars =
      punctuaionCharsAdditional && typeof punctuaionCharsAdditional === 'object'
        ? punctuaionCharsAdditional
        : [];

    const clampedText = StrClamper.clampLines(text, this.textContainer.current, {
      ellipsis, splitter, punctuation, reverse, prefix,
      gap:
        Number(gap) >= 0 ? Number(gap) : 0.01,
      punctuationChars:
        [...punctuationChars, ...additionalPunctuationChars],
      lines:
        Math.floor(Number(lines)) ? Math.floor(Number(lines)) : 1
    });
    this.setState({ clampedText });
  }
}

TextClamp.defaultProps = {
  styles: {},
  lines: 1,
  ellipsis: '...',
  punctuation: true,
  reverse: false,
  gap: 0.01,
  prefix: '',
  splitter: ' ',
  element: 'div',
  punctuationChars: [
    ',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':',
    String.fromCharCode(13), String.fromCharCode(10), String.fromCharCode(9)
  ],
  punctuaionCharsAdditional: [],
  onClick: () => null
};

let PropTypes;
try {
  PropTypes = require('prop-types');
  TextClamp.propTypes = {
    text: PropTypes.string.isRequired,
    styles: PropTypes.object,
    lines: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ellipsis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    splitter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    punctuation: PropTypes.bool,
    reverse: PropTypes.bool,
    gap: PropTypes.number,
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    element: PropTypes.string,
    punctuationChars: PropTypes.array,
    punctuaionCharsAdditional: PropTypes.array,
    onClick: PropTypes.func
  };
} catch {
}

export default TextClamp;
