import { faker } from '@faker-js/faker';

export interface Product {
  i: number;
  id: string;
  name: string;
  stock: string;
  price: string;
}

export function generateProductList(listSize: number): Product[] {
  const products: Product[] = [];

  for (let i = 1; i <= listSize; i++) {
    const product: Product = {
      i,
      id: faker.random.numeric(6),
      name: faker.commerce.product(),
      stock: faker.random.numeric(4),
      price: faker.commerce.price(),
    };
    products.push(product);
  }

  return products.reverse();
}

export function generateProduct(i: number): Product {
  const product: Product = {
    i,
    id: faker.random.numeric(6),
    name: faker.commerce.product(),
    stock: faker.random.numeric(4),
    price: faker.commerce.price(),
  };

  return product;
}

export default generateProductList;
