const utils = require('./utils.js');
const assert = require('assert');

const runTests = (tests = [], func) => {
  tests.forEach(config => {

    it(config.name, () => {
      assert.equal(
        func(...config.args),
        config.result
      );
    });

  });
};


// tests

const delLastCharsTests = [
  {
    name: 'Test 1 - simple and common case',
    args: [
      'Test string - dash, - ', ['-', ',', ' ']
    ],
    result: 'Test string - dash'
  },
  {
    name: 'Test 2 - reverse',
    args: [
      ' -, something.', ['!', '-', ',', ' '], true
    ],
    result: 'something.'
  },
  {
    name: 'Test 3 - multi chars',
    args: [
      'Aaa bbb ccc ddd eee, - sss.', ['sss', '.', '-', ',', 'eee', ' ']
    ],
    result: 'Aaa bbb ccc ddd'
  },
  {
    name: 'Test 4 - multi chars',
    args: [
      'Some strange string. And very, very "long"...', ['"', 'long', '.'], false
    ],
    result: 'Some strange string. And very, very '
  },
  {
    name: 'Test 5 - reverse, multi chars',
    args: [
      ' - 123, test - Aaa bbb ddd eee.', [' ', '-', '123', 'test', ','], true
    ],
    result: 'Aaa bbb ddd eee.'
  },
  {
    name: 'Test 6 - reverse, multi chars',
    args: [
      'Sqwerty_hr3Hkw', ['_', 'S', 'FK', 'AQ', 'qwerty', 'hk'], true
    ],
    result: 'hr3Hkw'
  },
  {
    name: 'Test 7 - reverse, multi chars, all chars are the same',
    args: [
      '______________', ['_'], true
    ],
    result: ''
  }
];


const clampTests = [
  {
    name: 'Test 1 - just a string of text',
    args: [
      'Just a piece of text. Nothing interesting. Test.', 0.7, ' '
    ],
    result: 'Just a piece of text.'
  },
  {
    name: 'Test 2 - serial key',
    args: [
      'serial-keykey-aj32hd-rreeww', 0.5, '-', true
    ],
    result: 'aj32hd-rreeww'
  },
  {
    name: 'Test 3 - digits',
    args: [
      '1234567890', 0.6, '', true
    ],
    result: '567890'
  },
  {
    name: 'Test 4 - 1% of string ("")',
    args: [
      'Just a piece of text.', 0.01, '', true
    ],
    result: ''
  },
  {
    name: 'Test 5 - 1% of string ("")',
    args: [
      'Just a piece of text.', 0.01, ' ', true
    ],
    result: ''
  },
  {
    name: 'Test 6 - 99% of string ("")',
    args: [
      'Just a piece of text.', 0.99, '.', true
    ],
    result: ''
  },
  {
    name: 'Test 7 - 99% of string ("")',
    args: [
      'Just a piece of text.', 0.99, '-', true
    ],
    result: ''
  }
];


// let's go!

describe('#delLastChars()', () => {
  runTests(delLastCharsTests, utils.delLastChars);
});

describe('#clamp()', () => {
  runTests(clampTests, utils.clamp);
});
