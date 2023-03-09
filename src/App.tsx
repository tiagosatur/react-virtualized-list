import React, { useState, useMemo } from 'react';
import { VirtualizedList } from './components/VirtualizedList/VirtualizedList';
import { InnerContainer } from './components/InnerContainer/InnerContainer';
import { generateProductList, generateProduct, Product } from './productUtils';
import './App.scss';

function App() {
  const [products, setProducts] = useState<Product[]>(
    useMemo(() => generateProductList(100000), [])
  );

  const onAddProduct = () => {
    const newProduct = generateProduct(products.length + 1);
    setProducts((prevProducts) => [newProduct].concat(prevProducts));
  };

  return (
    <div className='App'>
      <header className='header'>
        <div className='header__block title'>
          <h1>React Virtualized List</h1>
        </div>
        <div className='header__block actions'>
          <button onClick={onAddProduct} className='button'>
            Add random product
          </button>
        </div>
      </header>
      <VirtualizedList
        rowHeight={60}
        renderRow={(child) => <InnerContainer>{child}</InnerContainer>}
      >
        {products.map((p, i) => (
          <React.Fragment key={`name-${i}`}>
            <span>{p.i}</span>
            <span>{p.name}</span>
            <span>{p.price}</span>
          </React.Fragment>
        ))}
      </VirtualizedList>
    </div>
  );
}

export default App;
