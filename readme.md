# react-string-clamp

[![Licence](https://img.shields.io/npm/l/react-string-clamp.svg?colorB=%23)](https://www.npmjs.com/package/react-string-clamp) [![Downloads](https://img.shields.io/npm/dt/react-string-clamp.svg)](https://www.npmjs.com/package/react-string-clamp) [![Build Status](https://travis-ci.org/a-harkovets/react-string-clamp.svg?branch=master)](https://travis-ci.org/a-harkovets/react-string-clamp)

This library allows you to set up text clamp module.

 - [Source code](https://github.com/a-harkovets/react-string-clamp)
 - [Changelog](https://github.com/a-harkovets/react-string-clamp/blob/master/changelog.md)
#
Main features:

 - Automatically runs re-render if component size changed.
 - Supports reverse clamping.
 - Allows you to add your custom css-styles.
 - Supports any kind of string splitting rules (words, letters, dashes, etc.).
 - Customizable ellipsis.
 - Deletes punctuation characters before adding ellipsis.
 - Wide range of settings.
#
### Installation (npm)
```
npm install react-string-clamp --save
```
#
### Usage

Import `TextClamp` component.

```
import TextClamp from 'react-string-clamp';
```

Add `TextClamp` component to your code.

```
<TextClamp
  text="Long, long string..."
  ... // optional props
  />
```
#
### Optional props
 - `styles` - object of inline-styles. Default: `{}`.

 - `lines` - maximum number of lines. Default: `1`.

 - `ellipsis` - ellipsis. Default: `"..."`.

 - `prefix` - prefix for text. Default: `""`.

 - `reverse` - boolean. If enabled text will be clamped from the other side. Default: `false`.

 - `gap` - sets tolerance in range from 0 to 1. Default: `0.01`.

 - `splitter` - string. Sets rule of text splitting to unbreakable chunks. Default: `" "` (space).

 - `element` - HTML-tag name. Default: `"div"`.

 - `onClick` - onClick callback. Default: `() => null`.

 - `punctuation` - boolean. If enabled function will delete punctuation chars before adding ellipsis. Default: `true`.

 - `punctuationChars` - array. Allows to set your own array of punctuation chars array. Default: `',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':'`, Enter and Tabulation.

 - `punctuaionCharsAdditional` - array. Allows you to set additional punctuation chars array. Default: `[]`.


License
-

&nbsp;&nbsp;MIT
