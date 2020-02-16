/** @flow */

let uuid = 0;

function genUuid() {
  uuid += 1;
  return uuid;
}

export default genUuid;
