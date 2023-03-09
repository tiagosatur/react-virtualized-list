import React, { useState, useEffect, useMemo, useRef } from 'react';
import useElementDimensions from '../../useElementDimensions';
import { isArray, throttle } from 'lodash';
import './VirtualizedList.scss';

export interface VirtualizedListProps {
  children: Array<JSX.Element>;
  rowHeight: number;
  gap?: number;
  renderRow?: (child: JSX.Element) => JSX.Element;
}

interface ListItemProps {
  top: number;
  height: number;
  lineHeight: string;
  children: JSX.Element;
}

const ListItem = ({ top, height, lineHeight, children }: ListItemProps) => {
  return (
    <div
      className='list-item'
      style={{
        top,
        height,
        lineHeight,
      }}
    >
      {children}
    </div>
  );
};

const DefaultRenderRow = (child: JSX.Element) => (
  <div className='default-render-row'>{child}</div>
);

const bufferedItems = 2;

export const VirtualizedList = ({
  rowHeight,
  children,
  gap = 10,
  renderRow = (child) => DefaultRenderRow(child),
}: VirtualizedListProps) => {
  if (!isArray(children)) {
    throw Error('VirtualizedList expects an array of children');
  }

  if (!children.length) {
    return null;
  }

  const [containerRef, { height: containerHeight }] =
    useElementDimensions<HTMLUListElement>();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    return () => {
      onScroll.cancel();
    };
  }, []);

  const onScroll = React.useMemo(
    () =>
      throttle(
        function (e: any) {
          setScrollPosition(e.target.scrollTop);
        },
        60,
        { leading: false }
      ),
    []
  );

  const visibleRows = useMemo(() => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) +
        bufferedItems,
      children.length - 1
    );

    return children.slice(startIndex, endIndex + 1).map((child, index) => {
      const top = (startIndex + index) * rowHeight + index * gap;
      const height = rowHeight;
      const lineHeight = `${rowHeight}px`;

      return (
        <ListItem
          key={`name-${startIndex + index}`}
          top={top}
          height={height}
          lineHeight={lineHeight}
        >
          {renderRow(child)}
        </ListItem>
      );
    });
  }, [children, containerHeight, rowHeight, scrollPosition, gap]);

  return (
    <ul onScroll={onScroll} ref={containerRef} className='list'>
      {visibleRows}
    </ul>
  );
};

export default React.memo(VirtualizedList);
