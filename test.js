const utils = require('./utils.js');
var assert = require('assert');


// delLastChars

describe('#delLastChars()', function() {
  it('test #1', function() {
    assert.equal(
      utils.delLastChars('Test string - dash,.', ['.', ',']),
      'Test string - dash'
    );
  });
  
  it('test #2 (reverse)', function() {
    assert.equal(
      utils.delLastChars(' -, something.', ['!', '-', ',', ' '], true),
      'something.'
    );
  });
  
  it('test #3 (multi chars)', function() {
    assert.equal(
      utils.delLastChars('Aaa bbb ccc ddd eee, - sss.', ['sss', '.', '-', ',', 'eee', ' ']),
      'Aaa bbb ccc ddd'
    );
  });
  
  it('test #4 (multi chars, reverse)', function() {
    assert.equal(
      utils.delLastChars(' - 123, test - Aaa bbb ccc ddd eee.', [' ', '-', '123', 'test', ','], true),
      'Aaa bbb ccc ddd eee.'
    );
  });
});


// clamp

describe('#clamp()', function() {
  it('test #1', function() {
    assert.equal(
      utils.clamp('Just a piece of text. Nothing interesting. Test.', 0.7, ' '),
      'Just a piece of text.'
    );
  });

  it('test #2', function() {
    assert.equal(
      utils.clamp('serial-keykey-aj32hd-rreeww', 0.5, '-', true),
      'aj32hd-rreeww'
    );
  });

  it('test #3', function() {
    assert.equal(
      utils.clamp('1234567890', 0.6, '', true),
      '567890'
    );
  });

  it('test #4', function() {
    assert.equal(
      utils.clamp('Just a piece of text. Nothing interesting. Test.', 0.01, '', true),
      ''
    );
  });

  it('test #5', function() {
    assert.equal(
      utils.clamp('Just a piece of text. Nothing interesting. Test.', 0.01, '', true),
      ''
    );
  });
});