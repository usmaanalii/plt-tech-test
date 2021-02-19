import { stock } from './stock';
import { transactions } from './transactions';

export const app = (sku: string): Promise<{ sku: string, qty: number }> => new Promise((resolve, reject) => {
  const transaction = transactions.find(({ sku: transactionSku }) => transactionSku === sku);
  const stockItem = stock.find(({ sku: stockItemSku }) => stockItemSku === sku)

  if (!transaction && !stockItem) reject('This sku does not exist');

  if (transaction && !stockItem) resolve({ sku, qty: 0 });

  const { stock: startingStock } = stockItem;

  const qty = transactions.reduce((acc, { sku: transactionSku, type, qty }) => {
    if (transactionSku === sku) {
      switch (type){
        case 'order':
          acc -= qty;
          break;
        case 'refund':
          acc += qty;
          break
        default:
          break

      }
    }
    return acc;
  }, startingStock);

  return resolve({ sku, qty });
});
