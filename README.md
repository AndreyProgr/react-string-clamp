# react-string-clamp

[![Licence](https://img.shields.io/npm/l/react-string-clamp.svg?colorB=%23)](https://www.npmjs.com/package/react-string-clamp) [![Downloads](https://img.shields.io/npm/dt/react-string-clamp.svg)](https://www.npmjs.com/package/react-string-clamp) [![Build Status](https://travis-ci.org/a-harkovets/react-string-clamp.svg?branch=master)](https://travis-ci.org/a-harkovets/react-string-clamp)

![](demo.gif)
`react-string-clamp` component is on the left. On the right is a regular `div`. Lines property is equal to `2`, other optional props is unset (default values are used). *Powered by CSS animations.*

 - [Source code (GitHub)](https://github.com/a-harkovets/react-string-clamp)
 - [Changelog](https://github.com/a-harkovets/react-string-clamp/blob/master/changelog.md)


Main features:
---
 - Easy to use - only one required property and 2-3 optional will cover most of use cases.
 - Automatically runs re-render if component size changed.
 - Supports reverse clamping.
 - Allows you to add any custom css-styles.
 - Supports any kind of string splitting rules (words, letters, dashes, etc.).
 - Customizable ellipsis.
 - Deletes punctuation characters before adding ellipsis.
 - Wide range of another optional settings.

Installation
---
With NPM:
```
npm install react-string-clamp --save
```
or using YARN:
```
yarn add react-string-clamp
```

## Usage


Import `TextClamp` component.

```
import TextClamp from 'react-string-clamp';
```

Add `TextClamp` component to your code.

```
<TextClamp
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  ... // optional props
  />
```
### Recommendation!

> To prevent unexpected behaviors, do not use this component inside elements which width depends on inner content width (any inline element usually grows up as content becomes bigger). Version 0.2.0 (and higher) has some fixes intended to avoid problems (by stretching element to the full available width), but it would be better not to use this component is a such way.

Optional props
---
 - `styles` - object of inline-styles. Default: `{}`.
 
 - `className` - class attribute.

 - `lines` - maximum number of lines. Default: `1`.

 - `ellipsis` - ellipsis. Default: `"..."`.

 - `reverse` - boolean. If enabled text will be clamped from the other side. Default: `false`.

 - `gap` - sets tolerance in range from 0 to 1. Default: `0.01`.

 - `splitter` - string. Sets rule of text splitting to unbreakable chunks. Default: `" "` (space).

 - `element` - HTML-tag name. Default: `"div"`.

 - `onClick` - onClick callback. Default: `() => null`.

 - `punctuation` - boolean. If enabled function will delete punctuation chars before adding ellipsis. Default: `true`.

 - `punctuationChars` - array. Allows to set your own array of punctuation chars array. Default: `',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':'`, Enter and Tabulation.

 - `punctuaionCharsAdditional` - array. Allows you to set additional punctuation chars array. Default: `[]`.


## License


&nbsp;&nbsp;MIT
