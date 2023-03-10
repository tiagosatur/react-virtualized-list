import React, { useState, useMemo } from 'react';
import './VirtualizedList.scss';

interface MemoizedRenderItem {
  (index: number): JSX.Element;
}

interface RenderItem {
  (index: number): JSX.Element;
}

export interface VirtualizedListProps {
  itemHeight: number;
  totalItems: number;
  renderItem: RenderItem;
  header?: () => JSX.Element | null;
  height: number;
  bufferedItems?: number;
}

export function VirtualizedList({
  itemHeight,
  renderItem,
  height,
  totalItems,
  bufferedItems = 10,
  header = () => null,
}: VirtualizedListProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const innerHeight = totalItems * itemHeight;

  const startIndex = Math.max(
    Math.floor(scrollPosition / itemHeight) - bufferedItems,
    0
  );
  let endIndex = Math.min(
    Math.ceil((scrollPosition + height) / itemHeight - 1) + bufferedItems,
    totalItems - 1
  );

  const visibleItems: JSX.Element[] = [];

  const memoizedRenderItem: MemoizedRenderItem = useMemo(() => {
    return (index: number) => (
      <li
        key={index}
        style={{
          position: 'absolute',
          top: `${index * itemHeight}px`,
          width: '100%',
        }}
      >
        {renderItem(index)}
      </li>
    );
  }, [renderItem]);

  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(memoizedRenderItem(i));
  }

  const onScroll = (e: React.UIEvent<HTMLDivElement>) =>
    setScrollPosition(e.currentTarget.scrollTop);

  return (
    <div>
      <header>{header()}</header>
      <div
        className='scroll'
        style={{ overflowY: 'scroll', height: `${height}px` }}
        onScroll={onScroll}
      >
        <ul
          className='list'
          style={{ position: 'relative', height: `${innerHeight}px` }}
        >
          {visibleItems}
        </ul>
      </div>
    </div>
  );
}

export default VirtualizedList;
