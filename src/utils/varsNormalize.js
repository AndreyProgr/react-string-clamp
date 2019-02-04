function str(string, acceptableTypes = ['string', 'number']) {
  const response = { value: String(string), error: false };

  const typeOf = typeof string;
  if (typeOf !== 'string' && typeOf !== 'number') {
    response.error =
      `React-string-clamp error: string argument type is "${typeOf}". Expected "string" or "number".`;
    return response;
  }
  if (typeOf === 'number' && isNaN(string)) {
    response.error =
      'React-string-clamp error: string argument is NaN!';
    return response;
  }
  return response;
}

function element(HTMLelement) {
  const response = { value: HTMLelement, error: false };

  if (
    !HTMLelement
    || typeof HTMLelement !== 'object'
    || typeof HTMLelement.style !== 'object'
    || !HTMLelement.nodeName
  ) {
    response.error = 'React-string-clamp internal error: HTMLelement argument is incorrect!';
    return response;
  }
  return response;
}

function lines(linesAmount) {
  const response = { value: Number(Math.floor(linesAmount)), error: false };

  const typeOf = typeof linesAmount;
  if (typeOf !== 'string' && typeOf !== 'number') {
    response.error =
      `React-string-clamp error: lines argument type is "${typeOf}". Expected "string" or "number".`;
    return response;
  }
  if (isNaN(Number(linesAmount))) {
    response.error =
      'React-string-clamp error: lines argument is NaN!';
    return response;
  }
  return response;
}

function normalizeValue(value, rule, acceptableTypes = '*', strict = true, valueOnError) {
  const response = { source: value, error: false };

  switch (rule) {

    // integer
    case 'integer':
      const val = Math.floor(value);
      if (isNaN(value) || (strict && value === '')) {
        response.error = `Value "${value}" cannot be normalized with "${rule}" rule!`;
        response.value = valueOnError;
        break;
      }
      response.value = val;
      break;

    default:
      response.value = valueOnError;
      response.error = `Rule "${rule}" is incorrect!`;
      break;

  }

  return response;
}

function isNumber(value) {
  return !isNaN(Number(value)) && value !== '';
}

function isGreaterThan(value, max) {
  return Number(value) > Number(max);
}

function isLessThan(value, min) {
  return Number(value) < Number(min);
}

function validateValue(value, rule, options = {}) {
  let result;
  // console.log(!isNumber(value), (isNumber(options.min) && isLessThan(value, options.min)), (isNumber(options.max) && isGreaterThan(value, options.max)))
  switch (rule) {

    // number
    case 'number':
      if (
        !isNumber(value)
        || (isNumber(options.min) && isLessThan(value, options.min))
        || (isNumber(options.max) && isGreaterThan(value, options.max))
        || typeof value === 'boolean'
      ) {
        return false;
      }
      return true;

      // number
    case 'integer':
      if (
        !isNumber(value)
        || (isNumber(options.min) && isLessThan(value, options.min))
        || (isNumber(options.max) && isGreaterThan(value, options.min))
        || typeof value === 'boolean'
        || Math.floor(Number(value)) !== Number(value)
      ) {
        return false;
      }
      return true;


    // unset
    default:
      break;

  }
  return result;
}

module.exports = { str, element, lines, normalizeValue, validateValue };
