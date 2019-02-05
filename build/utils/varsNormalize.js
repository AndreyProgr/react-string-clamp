'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function str(string) {
  var acceptableTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['string', 'number'];

  var response = { value: String(string), error: false };

  var typeOf = typeof string === 'undefined' ? 'undefined' : _typeof(string);
  if (typeOf !== 'string' && typeOf !== 'number') {
    response.error = 'React-string-clamp error: string argument type is "' + typeOf + '". Expected "string" or "number".';
    return response;
  }
  if (typeOf === 'number' && isNaN(string)) {
    response.error = 'React-string-clamp error: string argument is NaN!';
    return response;
  }
  return response;
}

function element(HTMLelement) {
  var response = { value: HTMLelement, error: false };

  if (!HTMLelement || (typeof HTMLelement === 'undefined' ? 'undefined' : _typeof(HTMLelement)) !== 'object' || _typeof(HTMLelement.style) !== 'object' || !HTMLelement.nodeName) {
    response.error = 'React-string-clamp internal error: HTMLelement argument is incorrect!';
    return response;
  }
  return response;
}

function lines(linesAmount) {
  var response = { value: Number(Math.floor(linesAmount)), error: false };

  var typeOf = typeof linesAmount === 'undefined' ? 'undefined' : _typeof(linesAmount);
  if (typeOf !== 'string' && typeOf !== 'number') {
    response.error = 'React-string-clamp error: lines argument type is "' + typeOf + '". Expected "string" or "number".';
    return response;
  }
  if (isNaN(Number(linesAmount))) {
    response.error = 'React-string-clamp error: lines argument is NaN!';
    return response;
  }
  return response;
}

function normalizeValue(value, rule) {
  var acceptableTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var valueOnError = arguments[4];

  var response = { source: value, error: false };

  switch (rule) {

    // integer
    case 'integer':
      var val = Math.floor(value);
      if (isNaN(value) || strict && value === '') {
        response.error = 'Value "' + value + '" cannot be normalized with "' + rule + '" rule!';
        response.value = valueOnError;
        break;
      }
      response.value = val;
      break;

    default:
      response.value = valueOnError;
      response.error = 'Rule "' + rule + '" is incorrect!';
      break;

  }

  return response;
}

function isNumber(value) {
  return !isNaN(Number(value)) && value !== '' && typeof value !== 'boolean';
}

function isGreaterThan(value, max) {
  return Number(value) > Number(max);
}

function isLessThan(value, min) {
  return Number(value) < Number(min);
}

function validateValue(value, rule) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = void 0;
  // console.log(!isNumber(value), (isNumber(options.min) && isLessThan(value, options.min)), (isNumber(options.max) && isGreaterThan(value, options.max)))
  switch (rule) {

    // number
    case 'number':
      if (!isNumber(value) || isNumber(options.min) && isLessThan(value, options.min) || isNumber(options.max) && isGreaterThan(value, options.max)) {
        return false;
      }
      return true;

    // number
    case 'unsigned number':
      if (!isNumber(value) || isNumber(options.min) && isLessThan(value, options.min) || isNumber(options.max) && isGreaterThan(value, options.max) || Math.abs(Number(value)) !== Number(value)) {
        return false;
      }
      return true;

    // number
    case 'integer':
      if (!isNumber(value) || isNumber(options.min) && isLessThan(value, options.min) || isNumber(options.max) && isGreaterThan(value, options.min) || Math.floor(Number(value)) !== Number(value)) {
        return false;
      }
      return true;

    // unset
    default:
      return false;

  }
}

module.exports = { str: str, element: element, lines: lines, normalizeValue: normalizeValue, validateValue: validateValue };