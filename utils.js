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


function createSimilarEl(sample, styles = {}) {
  const element = document.createElement(sample.tagName);
  const sampleStylesText = window.getComputedStyle(sample).cssText;

  element.style.cssText = sampleStylesText;
  for (const property in styles) {
    element.style[property] = styles[property];
  }
  return element;
}


function clampLines(text, element, {
  lines, ellipsis, splitter, punctuation, gap, reverse, prefix, punctuationChars
}) {

  const maxHeight = 3 * Number(lines);
  const testEl = createSimilarEl(element, {
    lineHeight: `${3}px`, height: 'auto',
    position: 'absolute', opacity: '0', left: '-9999px',
    width: `${element.clientWidth * (1 - Number(gap))}px`,
    paddingTop: 0, paddingBottom: 0
  });
  element.appendChild(testEl);

  let clampedText = text;
  testEl.innerHTML = reverse
    ? `${ellipsis}${clampedText}${prefix}`
    : `${prefix}${clampedText}${ellipsis}`;

  let testElHeight = testEl.clientHeight;
  if (testElHeight <= maxHeight) {
    testEl.remove();
    return clampedText;
  }

  let decrementCoeff = (maxHeight / testElHeight) + 0.35;
  while (testElHeight > maxHeight && clampedText.length) {
    clampedText = clamp(text, decrementCoeff, splitter, reverse);
    clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;

    testEl.innerHTML = reverse
      ? `${ellipsis}${clampedText}${prefix}`
      : `${prefix}${clampedText}${ellipsis}`;
    testElHeight = testEl.clientHeight;
    decrementCoeff -= 0.025;
  }

  testEl.remove();
  clampedText = punctuation
    ? delLastChars(clampedText, punctuationChars, reverse)
    : clampedText;
  return reverse
    ? `${ellipsis}${clampedText}${prefix}`
    : `${prefix}${clampedText}${ellipsis}`;
}

module.exports = {
  delLastChars, clamp, clampLines, createSimilarEl
};
