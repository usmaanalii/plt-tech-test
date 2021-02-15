import { stock } from './stock';

export const app = (sku: string) => new Promise((resolve, reject) => {
  if (!stock.map(({ sku }) => sku).includes(sku)) reject('This sku does not exist');

  const stockItem = stock.find(({ sku }) => sku === sku);

  return resolve(stockItem);
});
