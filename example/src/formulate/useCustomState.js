/** @flow */
import * as React from "react";

type CustomState<Data> = {|
  +stateRef: {| +current: Data |},
  +forceRerender: () => void,
|}

/**
 * useCustomState exists to allow exact control of when rerenders occur
 * and squeeze out performance by mutating as opposed to overriding state.
 */
function useCustomState<Data>(initialData: Data): CustomState<Data> {
  const [toggle, setToggle] = React.useState(false);
  const forceRerender = () => {
    setToggle(!toggle);
  }

  const stateRef = React.useRef(initialData);

  return {
    stateRef,
    forceRerender,
  };
}

export default useCustomState;
