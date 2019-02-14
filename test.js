const utils = require('./src/utils.js');
const assert = require('assert');

const runTests = (tests = [], func) => {
  tests.forEach(config => {

    it(config.name, () => {
      assert.equal(
        config.wrapFunc ? config.wrapFunc(func(...config.args)) : func(...config.args),
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
  },
  {
    name: 'Test 8 - just a long text',
    args: [
      ',,,,,,,,,,,,.........../////////////////,,,,,,,,........//////////,./.,./..........,/,.,,' +
      ',./,/./,/./,/./,/./,/./,//./,/./,////./,,,,,,,,,,,,,,,.............................,//.,/' +
      ',,,,,,,,,,,,.........../////////////////,,,,,,,,........//////////,./.,./..........,/,.,,' +
      ',./,/./,/./,/./,/./,/./,//./,/./,////./,,,,,,,,,,,,,,,.............................,//.,/' +
      ',,,,,,,,,,,,.........../////////////////,,,,,,,,........//////////,./.,./..........,/,.,,' +
      ',./,/./,/./,/./,/./,/./,//./,/./,////./,,,,,,,,,,,,,,,.............................,//.,/' +
      ',,,,,,,,,,,,.........../////////////////,,,,,,,,........//////////,./.,./..........,/,.,,' +
      ',./,/./,/./,/./,/./,/./,//./,/./,////./,,,,,,,,,,,,,,,.............................,//.,/' +
      ',,,,,,,,,,,,.........../////////////////,,,,,,,,........//////////,./.,./..........,/,.,,' +
      '"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""' +
      '"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""' +
      '"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""' +
      ',,,,,,,,,,,,.........../////////////////,,,,,,,,........//////////,./.,./..........,/,.,,',
      [
        ',', '.', '/', 'q@', '*!', '#$', '--', '"', '+=', 'df', 'ddd', '----', 'ccc', '{', '}'
      ],
      true
    ],
    result: ''
  },
  {
    name: 'Test 9 - incorrect some types of arguments',
    args: [
      undefined, ['u', 'nd', '}'], 'true'
    ],
    result: 'efined'
  },
  {
    name: 'Test 10 - incorrect types of all arguments',
    args: [
      NaN, 'Na', 0
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
      'Just a piece of text.', 0.99, '-'
    ],
    result: ''
  },
  {
    name: 'Test 8 - coeff = 2 (max - 1)',
    args: [
      'Just a piece of text.', 2, ' ', true
    ],
    result: 'Just a piece of text.'
  },
  {
    name: 'Test 9 - coeff = -0.5 (min - 0)',
    args: [
      'Just a piece of text.', -0.5, ' ', true
    ],
    result: ''
  },
  {
    name: 'Test 10 - incorrect types of arguments',
    args: [
      {}, NaN, ' ', false
    ],
    result: ''
  }
];


const constructStringTests = [
  {
    name: 'Test 1 - empty args',
    args: [],
    result: ''
  },
  {
    name: 'Test 2 - just a text',
    args: ['Some text.'],
    result: 'Some text.'
  },
  {
    name: 'Test 3 - correct usage',
    args: ['Some text', '...', ' - '],
    result: ' - Some text...'
  },
  {
    name: 'Test 4 - correct usage',
    args: ['.', '.', '.'],
    result: '...'
  },
  {
    name: 'Test 5 - correct usage, reverse',
    args: ['.', '.', '.', true],
    result: '...'
  },
  {
    name: 'Test 6 - correct usage, reverse',
    args: ['some text', '...', '!', true],
    result: '...some text!'
  },
  {
    name: 'Test 7 - incorrect argument',
    args: ['Some text', NaN, ' - '],
    result: ' - Some textNaN'
  },
  {
    name: 'Test 8 - incorrect argument',
    args: ['Some text', undefined, ' - '],
    result: ' - Some text'
  },
  {
    name: 'Test 9 - incorrect arguments',
    args: [null, false, ',...'],
    result: ',...nullfalse'
  },
  {
    name: 'Test 10 - incorrect all arguments, reverse',
    args: [-99, {}, ~true, true],
    result: '[object Object]-99-2'
  }
];


const normalizeValueTests = [
  {
    name: 'Test 1.1 - number normalize',
    args: ['10'],
    result: 10
  },
  {
    name: 'Test 1.2 - number normalize',
    args: ['10.202'],
    result: 10.202
  },
  {
    name: 'Test 1.3 - number normalize',
    args: ['010.'],
    result: 10
  },
  {
    name: 'Test 1.4 - number normalize',
    args: ['-099990.2'],
    result: -99990.2
  },
  {
    name: 'Test 1.5 - number normalize',
    args: [''],
    result: true,
    wrapFunc: result => isNaN(result)
  }
];


// let's go!

describe('#delLastChars()', () => {
  runTests(delLastCharsTests, utils.delLastChars);
});

describe('#clamp()', () => {
  runTests(clampTests, utils.clamp);
});

describe('#constructString()', () => {
  runTests(constructStringTests, utils.constructString);
});

describe('#normalizeValue()', () => {
  runTests(normalizeValueTests, utils.normalizeValue);
});
