import { useState, useMemo } from 'react';
import { VirtualizedList } from './components/VirtualizedList/VirtualizedList';
import { InnerContainer } from './components/InnerContainer/InnerContainer';
import { ListHeader } from './components/ListHeader/ListHeader';
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

  const renderProduct = (index: number): JSX.Element => {
    const { i, name, price, id } = products[index];
    return <InnerContainer key={id} index={i} name={name} price={price} />;
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
        itemHeight={50}
        height={500}
        header={ListHeader}
        totalItems={products.length}
        renderItem={renderProduct}
      />
    </div>
  );
}

export default App;
