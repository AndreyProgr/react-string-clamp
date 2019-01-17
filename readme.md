# react-string-clamp

This library allows you to set up smart element with line clamping feature.
Full readme and documentation will be soon.

This is just a zero version. But you can try it right now.

### Installation

Add `react-string-clamp` package to your project.

```
npm install react-string-clamp --save
```

### Usage

Import `TextClamp` component.

```
import TextClamp from 'react-string-clamp';
```

Add `TextClamp` component to your code.

```
<TextClamp
  text={`${this.props.dialogState.resume.title},`}
  ... // optional props
  />
```

### Optional props
&nbsp;&nbsp;`styles` - object of inline-styles. Default: `{}`.

&nbsp;&nbsp;`lines` - maximum number of lines. Default: `1`.

&nbsp;&nbsp;`ellipsis` - ellipsis. Default: `"..."`.

&nbsp;&nbsp;`prefix` - prefix for text. Default: `""`.

&nbsp;&nbsp;`reverse` - boolean. If enabled text will be clamped from the other side. Default: `false`.

&nbsp;&nbsp;`gap` - sets tolerance in range from 0 to 1. Default: `0.01`.

&nbsp;&nbsp;`splitter` - string. Sets rule of text splitting to unbreakable chunks. Default: `" "` (space).

&nbsp;&nbsp;`element` - HTML-tag name. Default: `"div"`.

&nbsp;&nbsp;`onClick` - onClick callback. Default: `() => null`.

&nbsp;&nbsp;`punctuation` - boolean. If enabled function will delete punctuation chars before adding ellipsis. Default: `true`.

&nbsp;&nbsp;`punctuationChars` - array. Allows to set your own array of punctuation chars array. Default: `',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':'` and Enter, Tab.

&nbsp;&nbsp;`punctuaionCharsAdditional` - array. Allows to set additional punctuation chars array. Default: `[]`.

#
License
----

MIT