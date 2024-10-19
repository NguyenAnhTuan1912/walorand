import React from "react";

export function useOnUnmount(callback) {
  React.useLayoutEffect(() => {
    return () => {
      if (callback) {
        callback();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
