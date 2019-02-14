'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextClamp = function (_PureComponent) {
  _inherits(TextClamp, _PureComponent);

  function TextClamp() {
    _classCallCheck(this, TextClamp);

    var _this = _possibleConstructorReturn(this, (TextClamp.__proto__ || Object.getPrototypeOf(TextClamp)).call(this));

    _this.state = {
      clampedText: ''
    };
    _this.textContainer = _react2.default.createRef();
    _this.handleResize = _this.checkForResize.bind(_this);
    return _this;
  }

  _createClass(TextClamp, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          element = _props.element,
          onClick = _props.onClick;
      var clampedText = this.state.clampedText;

      return _react2.default.createElement(element || typeof element !== 'string' ? element : 'div', {
        ref: this.textContainer,
        style: _extends({ display: 'block', width: '100%' }, styles),
        onClick: onClick
      }, clampedText);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.aaa = _utils2.default;
      this.clampText();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: 'checkForResize',
    value: function checkForResize() {
      var containerWidth = this.state.containerWidth;

      var actualWidth = this.textContainer.current.clientWidth;
      if (containerWidth !== actualWidth) {
        this.setState({
          containerWidth: actualWidth
        });
        this.clampText();
      }
    }
  }, {
    key: 'clampText',
    value: function clampText() {
      if (!this || !this.textContainer.current) {
        return;
      }
      var _props2 = this.props,
          text = _props2.text,
          lines = _props2.lines,
          ellipsis = _props2.ellipsis,
          splitter = _props2.splitter,
          punctuation = _props2.punctuation,
          gap = _props2.gap,
          reverse = _props2.reverse,
          punctuationChars = _props2.punctuationChars,
          punctuaionCharsAdditional = _props2.punctuaionCharsAdditional;

      if (!text) {
        return;
      }

      var additionalPunctuationChars = punctuaionCharsAdditional && (typeof punctuaionCharsAdditional === 'undefined' ? 'undefined' : _typeof(punctuaionCharsAdditional)) === 'object' ? punctuaionCharsAdditional : [];

      var clampedText = _utils2.default.clampLines(text, this.textContainer.current, {
        ellipsis: ellipsis, splitter: splitter, punctuation: punctuation, reverse: reverse,
        gap: Number(gap) >= 0 ? Number(gap) : 0.01,
        punctuationChars: [].concat(_toConsumableArray(punctuationChars), _toConsumableArray(additionalPunctuationChars)),
        lines: Math.floor(Number(lines)) ? Math.floor(Number(lines)) : 1
      });
      this.setState({ clampedText: clampedText });
    }
  }]);

  return TextClamp;
}(_react.PureComponent);

TextClamp.defaultProps = {
  styles: {},
  lines: 1,
  ellipsis: '...',
  punctuation: true,
  reverse: false,
  gap: 0.01,
  splitter: ' ',
  element: 'div',
  punctuationChars: [',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':', String.fromCharCode(13), String.fromCharCode(10), String.fromCharCode(9)],
  punctuaionCharsAdditional: [],
  onClick: function onClick() {
    return null;
  }
};

var PropTypes = void 0;
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
    element: PropTypes.string,
    punctuationChars: PropTypes.array,
    punctuaionCharsAdditional: PropTypes.array,
    onClick: PropTypes.func
  };
} catch (err) {}

exports.default = TextClamp;