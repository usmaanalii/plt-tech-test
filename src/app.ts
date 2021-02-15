import { stock } from './stock';
import { transactions } from './transactions';

export const app = (sku: string): Promise<{ sku: string, qty: number }> => new Promise((resolve, reject) => {
  const selectedTransaction = transactions.find(({ sku: transactionSku }) => transactionSku === sku);

  if (!selectedTransaction) reject('This sku does not exist');

  const qty = stock.map(({ sku }) => sku).includes(sku) ? selectedTransaction.qty : 0;

  return resolve({ sku, qty });
});
