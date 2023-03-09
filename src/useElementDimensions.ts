import { useCallback, useEffect, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export default function useElementDimensions<
  T extends HTMLElement = HTMLDivElement
>(): [(node: T | null) => void, Dimensions] {
  const [ref, setRef] = useState<T | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    setDimensions({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return [setRef, dimensions];
}
