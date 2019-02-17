'use strict';

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
  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (str === '') {
    return '';
  }
  return reverse ? '' + ellipsis + str : '' + str + ellipsis;
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

// returns clamped string for a DOM-element
function clampLines(text, element, _ref) {
  var lines = _ref.lines,
      ellipsis = _ref.ellipsis,
      splitter = _ref.splitter,
      punctuation = _ref.punctuation,
      gap = _ref.gap,
      reverse = _ref.reverse,
      punctuationChars = _ref.punctuationChars;


  var maxHeight = 20 * Number(lines);
  var testEl = createSimilarEl(element, {
    lineHeight: 20 + 'px', height: 'auto',
    position: 'absolute', opacity: '0', left: '-1px',
    width: element.clientWidth * (1 - Number(gap)) + 'px',
    paddingTop: 0, paddingBottom: 0
  });
  element.appendChild(testEl);

  var clampedText = text;
  testEl.innerHTML = constructString(clampedText, ellipsis, reverse);

  var testElHeight = Math.ceil(testEl.clientHeight);
  if (testElHeight <= maxHeight) {
    testEl.remove();
    return clampedText;
  }

  var decrementCoeff = maxHeight / testElHeight + 0.35;
  while (testElHeight > maxHeight && clampedText.length) {
    clampedText = clamp(text, decrementCoeff, splitter, reverse);
    clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;

    testEl.innerHTML = constructString(clampedText, ellipsis, reverse);
    testElHeight = Math.ceil(testEl.clientHeight);
    decrementCoeff -= 0.025;
  }

  clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;
  return constructString(clampedText, ellipsis, reverse);
}

module.exports = {
  delLastChars: delLastChars, clamp: clamp, clampLines: clampLines, createSimilarEl: createSimilarEl, constructString: constructString,
  normalizeObj: normalizeObj, normalizeValue: normalizeValue
};