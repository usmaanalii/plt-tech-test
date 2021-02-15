import { stock } from './stock';
import { transactions } from './transactions';

export const app = (sku: string): Promise<{ sku: string, qty: number }> => new Promise((resolve, reject) => {
  if (!transactions.map(({ sku }) => sku).includes(sku)) reject('This sku does not exist');

  const qty = stock.map(({ sku }) => sku).includes(sku) ? transactions.find(({ sku }) => sku === sku).qty : 0;

  return resolve({ sku, qty });
});
