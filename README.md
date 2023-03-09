# React Virtualized List

## Setup
```bash
yarn
```

## Init
```bash
yarn dev
```


## Concepts and reasons
### Throttle
Why to use throttle over debounce? When scrolling, throttle will slowly call your function while you scroll (every X milliseconds). Debounce would wait until after you're done scrolling to call your function.
For performance reasons, we also need to cancel the throttle funciton call when the component unmounts to not call onScroll after it happens.

Why `useMemo` in `VirtualizedList`?
useCallback can be used to keep the instance (return the same instance) of the debounced function (callback) between component re-renderings.

However, each time the component re-renders, a new instance of the throttled callback is created by throttle(callback, 60). And it is wise to avoid calling throttle on each rendering.

As an alternative, we can use useMemo. It memoizes the throttled handler and also calls throttle only during the initial rendering of the component.

useMemo re-calculates the memoized value only when the dependencies change.