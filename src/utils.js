// deletes 'bad' characters
function delLastChars(sourceString, chars = [], reverse = false) {
  let finalString = String(sourceString);
  let nextIteration = true;

  while (nextIteration) {
    nextIteration = false;
    for (let i = 0; i < chars.length; i++) {

      const substring = reverse
        ? finalString.slice(0, chars[i].length)
        : finalString.slice(finalString.length - chars[i].length);

      if (substring === chars[i]) {
        finalString = reverse
          ? finalString.slice(chars[i].length, finalString.length)
          : finalString = finalString.slice(0, finalString.length - chars[i].length);

        nextIteration = true;
      }
    }
  }

  return finalString;
}


// clamps string
function clamp(text, coeff, splitter = '', reverse = false) {

  const textChunks = String(text).split(splitter);
  const sliceIndx = Math.floor(textChunks.length * coeff);
  if (sliceIndx < 1) {
    return '';
  }

  const clampedTextChunks = reverse
    ? textChunks.slice(-sliceIndx)
    : textChunks.slice(0, sliceIndx);

  return clampedTextChunks.join(splitter);
}


// returns copy of a DOM-element
function createSimilarEl(sample, styles = {}) {
  const element = document.createElement(sample.tagName);
  const sampleStyles = window.getComputedStyle(sample);
  const sampleStylesText = sampleStyles.cssText;

  element.style.cssText = sampleStylesText;
  element.style.maxWidth = sampleStyles.width;
  for (const property in styles) {
    element.style[property] = styles[property];
  }
  return element;
}


// Adds ellipsis & prefix to string
function constructString(str = '', ellipsis = '', reverse = false) {
  if (str === '') {
    return '';
  }
  return reverse
    ? `${ellipsis}${str}`
    : `${str}${ellipsis}`;
}


// normalize param
function normalizeValue(value, rule = 'number') {
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
  const normalizedObj = { ...obj };
  const keys = Object.keys(normalizedObj);

  for (const key in keys) {
    normalizedObj[keys[key]] = normalizeValue(normalizedObj[keys[key]]);
  }
  return normalizedObj;
}


// returns clamped string for a DOM-element
function clampLines(text, element, {
  lines, ellipsis, splitter, punctuation, gap, reverse, punctuationChars
}) {

  const maxHeight = 20 * Number(lines);
  const testEl = createSimilarEl(element, {
    lineHeight: `${20}px`, height: 'auto',
    position: 'absolute', opacity: '0', left: '-1px',
    width: `${element.scrollWidth * (1 - Number(gap))}px`,
    paddingTop: 0, paddingBottom: 0
  });
  element.appendChild(testEl);

  let clampedText = text;
  testEl.innerHTML = constructString(clampedText, ellipsis, reverse);

  let testElHeight = Math.ceil(testEl.scrollHeight);
  if (testElHeight <= maxHeight) {
    // IE11 compatibility (element.remove() is not supported)
    testEl.parentNode.removeChild(testEl);
    // =========================
    return clampedText;
  }

  let decrementCoeff = (maxHeight / testElHeight) + 0.35;
  while (testElHeight > maxHeight && clampedText.length) {
    clampedText = clamp(text, decrementCoeff, splitter, reverse);
    clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;

    testEl.innerHTML = constructString(clampedText, ellipsis, reverse);
    testElHeight = Math.ceil(testEl.scrollHeight);
    decrementCoeff -= 0.02;
  }
  // IE11 compatibility (element.remove() is not supported)
  testEl.parentNode.removeChild(testEl);
  // =========================

  clampedText = punctuation
    ? delLastChars(clampedText, punctuationChars, reverse)
    : clampedText;
  return constructString(clampedText, ellipsis, reverse);
}

module.exports = {
  delLastChars, clamp, clampLines, createSimilarEl, constructString,
  normalizeObj, normalizeValue
};
