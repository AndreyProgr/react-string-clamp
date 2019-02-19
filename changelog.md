# `react-string-clamp` changelog

All notable changes to this project will be documented in this file.

# v0.2.0

- Removed «prefix» prop.
- Fixed bug (minimal width) witch occured when trying to place TextClamp component inside a parent flex container.
- Added Babel. Now built package is used ES5 (ES6+ code in unsupported by some common used plugins and libraries, as, for example UglifyJs).
- Added ability to rewrite two default inline-style rules.
- Improved onresize handling and listening mechanism.

# v0.1.3

- Code optimization & refactoring.

# v0.1.2

- Changelog update (added missed 0.1.1 version).
- Readme update.

# v0.1.1

- Fixed non critical bug. Attempt to call clampText() asynchronously. Could be reason for errors if your component takes several re-renders in a very short period of time.

# v0.1.0

- Added a changelog file.
- Readme updated.
- Added unit-tests.
- Now punctuation chars array can contain multi-character strings.
- Light refactoring and bugfix.
- Added linter.
- Repository added to travis-ci.

# v0.0.0

- Just the first release.
