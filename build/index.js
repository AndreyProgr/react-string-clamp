'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

    _this.putReRenderTasksQueue = function () {
      var _this$state = _this.state,
          lastResizeCallTimestamp = _this$state.lastResizeCallTimestamp,
          clampTextTimeout = _this$state.clampTextTimeout;

      if (window.performance.now() > lastResizeCallTimestamp + 130) {
        _this.setState({ clampTextTimeout: null });
        setTimeout(_this.clampText, 0);
      } else if (!clampTextTimeout) {
        _this.setState({
          clampTextTimeout: setTimeout(_this.clampText, lastResizeCallTimestamp + 130 - window.performance.now())
        });
      }
    };

    _this.componentDidMount = function () {
      _this.clampText();
      window.addEventListener('resize', _this.putReRenderTasksQueue);
      setInterval(_this.sizeGuard, 80);
    };

    _this.componentWillUnmount = function () {
      window.removeEventListener('resize', _this.putReRenderTasksQueue);
      setInterval(_this.sizeGuard, 80);
    };

    _this.componentDidUpdate = function (prevProps, prevState) {
      if (_this.state.clampedText !== prevState.clampedText) {
        _this.setState({
          maxHeight: _this.textContainer.current.clientHeight
        });
      }
    };

    _this.sizeGuard = function () {
      var latestWidth = _this.state.latestWidth;

      if (latestWidth !== Math.round(_this.textContainer.current.clientWidth)) {
        _this.setState({
          latestWidth: Math.round(_this.textContainer.current.clientWidth)
        });
        _this.putReRenderTasksQueue();
      }
    };

    _this.clampText = function () {
      if (!_this || !_this.textContainer.current) {
        return;
      }
      var _this$props = _this.props,
          text = _this$props.text,
          lines = _this$props.lines,
          ellipsis = _this$props.ellipsis,
          splitter = _this$props.splitter,
          punctuation = _this$props.punctuation,
          gap = _this$props.gap,
          reverse = _this$props.reverse,
          punctuationChars = _this$props.punctuationChars,
          punctuaionCharsAdditional = _this$props.punctuaionCharsAdditional;

      if (!text) {
        return;
      }

      var additionalPunctuationChars = punctuaionCharsAdditional && (typeof punctuaionCharsAdditional === 'undefined' ? 'undefined' : _typeof(punctuaionCharsAdditional)) === 'object' ? punctuaionCharsAdditional : [];

      var clampedText = _utils2.default.clampLines(text, _this.textContainer.current, {
        ellipsis: ellipsis, splitter: splitter, punctuation: punctuation, reverse: reverse,
        gap: Number(gap) >= 0 ? Number(gap) : 0.01,
        punctuationChars: [].concat(_toConsumableArray(punctuationChars), _toConsumableArray(additionalPunctuationChars)),
        lines: Math.floor(Number(lines)) ? Math.floor(Number(lines)) : 1
      });
      _this.setState({
        clampedText: clampedText,
        lastResizeCallTimestamp: window.performance.now()
      });
    };

    _this.state = {
      clampedText: '',
      lastResizeCallTimestamp: 0,
      maxHeight: null
    };
    _this.textContainer = _react2.default.createRef();
    return _this;
  }

  _createClass(TextClamp, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          element = _props.element,
          onClick = _props.onClick;
      var _state = this.state,
          clampedText = _state.clampedText,
          maxHeight = _state.maxHeight;

      var builtInStyles = {
        maxHeight: maxHeight,
        display: 'block',
        overflowY: 'hidden'
      };

      return _react2.default.createElement(element || typeof element !== 'string' ? element : 'div', {
        ref: this.textContainer,
        style: _extends({}, builtInStyles, styles),
        onClick: onClick
      }, clampedText);
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