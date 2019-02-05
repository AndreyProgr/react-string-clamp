'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// deletes 'bad' characters
function delLastChars(sourceString) {
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var finalString = String(sourceString);
  var nextIteration = true;

  while (nextIteration) {
    nextIteration = false;
    for (var i = 0; i < chars.length; i++) {

      var substring = reverse ? finalString.slice(0, chars[i].length) : finalString.slice(finalString.length - chars[i].length);

      if (substring === chars[i]) {
        finalString = reverse ? finalString.slice(chars[i].length, finalString.length) : finalString = finalString.slice(0, finalString.length - chars[i].length);

        nextIteration = true;
      }
    }
  }

  return finalString;
}

// clamps string
function clamp(text, coeff) {
  var splitter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


  var textChunks = String(text).split(splitter);
  var sliceIndx = Math.floor(textChunks.length * coeff);
  if (sliceIndx < 1) {
    return '';
  }

  var clampedTextChunks = reverse ? textChunks.slice(-sliceIndx) : textChunks.slice(0, sliceIndx);

  return clampedTextChunks.join(splitter);
}

// returns copy of a DOM-element
function createSimilarEl(sample) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var element = document.createElement(sample.tagName);
  var sampleStylesText = window.getComputedStyle(sample).cssText;

  element.style.cssText = sampleStylesText;
  for (var property in styles) {
    element.style[property] = styles[property];
  }
  return element;
}

// Adds ellipsis & prefix to string
function constructString() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var ellipsis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (str === '') {
    return '';
  }
  return reverse ? '' + ellipsis + str + prefix : '' + prefix + str + ellipsis;
}

// normalize param
function normalizeValue(value) {
  var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'number';

  switch (rule) {
    case 'number':
      if (!parseFloat(value)) {
        return NaN;
      }
      return Number(value);
    default:
      return value;
  }
}

// normalize arguments types
function normalizeObj(obj) {
  var normalizedObj = _extends({}, obj);
  var keys = Object.keys(normalizedObj);

  for (var key in keys) {
    normalizedObj[keys[key]] = normalizeValue(normalizedObj[keys[key]]);
  }
  return normalizedObj;
}

function clampLines() {
  var srcStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var srcElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var srcLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var srcEllipsis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '...';
  var srcSplitter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ' ';
  var srcPunctuation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':', String.fromCharCode(13), String.fromCharCode(10), String.fromCharCode(9)];
  var srcGap = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.01;
  var srcReverse = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var srcPunctuationAdditional = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];

  var str = void 0,
      element = void 0,
      lines = void 0,
      ellipsis = void 0,
      splitter = void 0,
      punctuation = void 0,
      gap = void 0,
      reverse = void 0,
      punctuationChars = void 0;

  if (srcStr === undefined) {
    console.error('React-string-clamp error: string is undefined!');
    return;
  }
  if (typeof srcStr !== 'string' && typeof srcStr !== 'number') {
    console.error('React-string-clamp error: string type is ' + (typeof srcStr === 'undefined' ? 'undefined' : _typeof(srcStr)) + '. Expected string or number.');
    return;
  }

  return clampLinesKernel(str, element, lines, ellipsis, splitter, punctuation, gap, reverse, punctuationChars);
}

// returns clamped string for a DOM-element
function clampLinesKernel(text, element, _ref) {
  var lines = _ref.lines,
      ellipsis = _ref.ellipsis,
      splitter = _ref.splitter,
      punctuation = _ref.punctuation,
      gap = _ref.gap,
      reverse = _ref.reverse,
      prefix = _ref.prefix,
      punctuationChars = _ref.punctuationChars;


  var maxHeight = 3 * Number(lines);
  var testEl = createSimilarEl(element, {
    lineHeight: 3 + 'px', height: 'auto',
    position: 'absolute', opacity: '0', left: '-9999px',
    width: element.clientWidth * (1 - Number(gap)) + 'px',
    paddingTop: 0, paddingBottom: 0
  });
  element.appendChild(testEl);

  var clampedText = text;
  testEl.innerHTML = constructString(clampedText, ellipsis, prefix, reverse);

  var testElHeight = testEl.clientHeight;
  if (testElHeight <= maxHeight) {
    testEl.remove();
    return clampedText;
  }

  var decrementCoeff = maxHeight / testElHeight + 0.35;
  while (testElHeight > maxHeight && clampedText.length) {
    clampedText = clamp(text, decrementCoeff, splitter, reverse);
    clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;

    testEl.innerHTML = constructString(clampedText, ellipsis, prefix, reverse);
    testElHeight = testEl.clientHeight;
    decrementCoeff -= 0.025;
  }

  testEl.remove();
  clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;
  return constructString(clampedText, ellipsis, prefix, reverse);
}

module.exports = {
  delLastChars: delLastChars, clamp: clamp, clampLines: clampLines, createSimilarEl: createSimilarEl, constructString: constructString,
  normalizeObj: normalizeObj, normalizeValue: normalizeValue
};