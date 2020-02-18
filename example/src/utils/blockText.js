/** @flow */

/** returns text without starting and ending new line */
function blockText([text]: $ReadOnlyArray<string>) {
  const tabSize = 2;

  return text.slice(1, text.length - 1)
    .split('\n')
    .map(line => line.slice(tabSize))
    .join('\n');
}

export default blockText;