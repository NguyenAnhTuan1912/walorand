import React from "react";

import { useOnUnmount } from "./useOnUnmount";

const DEFAULT_INITIAL_ASYNC_PROCESS_STATE = {
  isPending: false,
  isFetched: false,
  data: null,
  error: null,
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function useAsyncProcess(options) {
  const { initialState, shouldResetDataWhenPending = true } = options || {};
  const [asyncState, setAsyncState] = React.useState(
    initialState || DEFAULT_INITIAL_ASYNC_PROCESS_STATE
  );
  const latestDataRef = React.useRef(asyncState.data);
  const isUnmountedRef = React.useRef(false);
  const asyncStateSetter = React.useCallback(
    (state) =>
      isUnmountedRef.current ? () => undefined : setAsyncState(state),
    []
  );

  const runAsyncProcess = React.useCallback(
    (promise, responseSerializer) => {
      asyncStateSetter({
        isPending: true,
        isFetched: false,
        data: shouldResetDataWhenPending ? null : latestDataRef.current,
        error: null,
      });

      promise
        .then((response) => {
          asyncStateSetter({
            isPending: false,
            isFetched: true,
            data: responseSerializer ? responseSerializer(response) : response,
            error: null,
          });
        })
        .catch((error) => {
          asyncStateSetter({
            isPending: false,
            isFetched: true,
            data: null,
            error,
          });
        });

      return promise;
    },
    [asyncStateSetter, shouldResetDataWhenPending]
  );

  React.useEffect(() => {
    latestDataRef.current = asyncState.data;
  }, [asyncState.data]);

  useOnUnmount(() => {
    isUnmountedRef.current = true;
  });

  return {
    state: asyncState,
    setState: asyncStateSetter,
    runAsyncProcess,
  };
}

export { DEFAULT_INITIAL_ASYNC_PROCESS_STATE };
