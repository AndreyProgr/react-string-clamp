function delLastChars(str, chars = [], reverse = false) {
  let clearedStr = String(str);
  let finishCycle = true;

  if (reverse) {
    while (finishCycle) {
      finishCycle = false;
      for (let i = 0; i < chars.length; i++) {
        if (clearedStr.slice(0, chars[i].length) === chars[i]) {
          clearedStr = clearedStr.slice(chars[i].length, clearedStr.length);
          finishCycle = true;
        }
      }
    }

  } else {
    while (finishCycle) {
      finishCycle = false;
      for (let i = 0; i < chars.length; i++) {
        if (clearedStr.slice(clearedStr.length - chars[i].length) === chars[i]) {
          clearedStr = clearedStr.slice(0, clearedStr.length - chars[i].length);
          finishCycle = true;
        }
      }
    }
  }

  return clearedStr;
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

  let decrementCoeff = maxHeight / testElHeight + 0.35;
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
