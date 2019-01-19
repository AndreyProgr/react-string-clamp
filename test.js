const utils = require('./utils.js');
const assert = require('assert');


// delLastChars

describe('#delLastChars()', () => {
  it('test #1', () => {
    assert.equal(
      utils.delLastChars('Test string - dash,.', ['.', ',']),
      'Test string - dash'
    );
  });

  it('test #2 (reverse)', () => {
    assert.equal(
      utils.delLastChars(' -, something.', ['!', '-', ',', ' '], true),
      'something.'
    );
  });

  it('test #3 (multi chars)', () => {
    assert.equal(
      utils.delLastChars('Aaa bbb ccc ddd eee, - sss.', ['sss', '.', '-', ',', 'eee', ' ']),
      'Aaa bbb ccc ddd'
    );
  });

  it('test #4 (multi chars, reverse)', () => {
    assert.equal(
      utils.delLastChars(' - 123, test - Aaa bbb ddd eee.', [' ', '-', '123', 'test', ','], true),
      'Aaa bbb ddd eee.'
    );
  });

  it('test #5 (multi chars, reverse)', () => {
    assert.equal(
      utils.delLastChars('RS_hr3Hkw', ['_', 'RS', 'FK', 'AQ'], true),
      'hr3Hkw'
    );
  });
});


// clamp

describe('#clamp()', () => {
  it('test #1', () => {
    assert.equal(
      utils.clamp('Just a piece of text. Nothing interesting. Test.', 0.7, ' '),
      'Just a piece of text.'
    );
  });

  it('test #2', () => {
    assert.equal(
      utils.clamp('serial-keykey-aj32hd-rreeww', 0.5, '-', true),
      'aj32hd-rreeww'
    );
  });

  it('test #3', () => {
    assert.equal(
      utils.clamp('1234567890', 0.6, '', true),
      '567890'
    );
  });

  it('test #4', () => {
    assert.equal(
      utils.clamp('Just a piece of text. Nothing interesting. Test.', 0.01, '', true),
      ''
    );
  });

  it('test #5', () => {
    assert.equal(
      utils.clamp('Just a piece of text. Nothing interesting. Test.', 0.01, '', true),
      ''
    );
  });
});
