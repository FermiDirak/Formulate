/** @flow */
import * as React from "react";

type ForceRerender = () => void;

/** useForceRerender exists to allow exact control of when rerenders occur */
function useForceRerender(): ForceRerender {
  const [toggle, setToggle] = React.useState(false);
  const forceRerender = () => {
    setToggle(!toggle);
  }

  return forceRerender;
}

export default useForceRerender;
