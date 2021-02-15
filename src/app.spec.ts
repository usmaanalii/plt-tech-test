const mockedInStockSku = 'some mocked in stock sku';
const mockedOutOfStockSku = 'some mocked out of stock sku'
const mockedIncorrectSku = 'some mocked incorrect sku';

const mockedStockItemSku = mockedInStockSku;
const mockFirstStockItem = { sku: mockedStockItemSku };
const mockedStock = [ mockFirstStockItem ];

const mockedFirstTransactionItemSku = mockedInStockSku;
const mockedFirstTransactionItemType = 'some mocked first transaction item type';
const mockedFirstTransactionItemQty = 'some mocked first transaction item quantity';

const mockedSecondTransactionItemSku = mockedOutOfStockSku;
const mockedSecondTransactionItemType = 'some mocked second transaction item type';
const mockedSecondTransactionItemQty = 'some mocked second transaction item quantity';

const mockedFirstTransaction = {
  sku: mockedFirstTransactionItemSku,
  type: mockedFirstTransactionItemType,
  qty: mockedFirstTransactionItemQty
};

const mockedSecondTransaction = {
  sku: mockedSecondTransactionItemSku,
  type: mockedSecondTransactionItemType,
  qty: mockedSecondTransactionItemQty
};

const mockedTransactions = [
  mockedFirstTransaction,
  mockedSecondTransaction
];

const expectedError = 'This sku does not exist';

describe('Given the app', () => {
  let app;

  beforeEach(() => {
    jest.doMock('./stock', () => ({
      stock: mockedStock
    }));

    jest.doMock('./transactions', () => ({
      transactions: mockedTransactions
    }));
  });

  describe('When imported as a node module', () => {
    beforeEach(() => {
      ({ app } = require('./app'));
    });

    describe('And when calling app with an sku that does NOT exist', () => {
      let actualError;

      beforeEach(() => app(mockedIncorrectSku).catch(error =>actualError = error));

      it('Then should return the expected error', () => {
        expect(actualError).toBe(expectedError)
      });
    });

    describe('And when calling app with an sku that does exist but is NOT in stock', () => {
      let actualResponse;

      const expectedResponse = {
        sku: mockedOutOfStockSku,
        qty: 0
      };

      beforeEach(() => app(mockedOutOfStockSku).then(response => actualResponse = response));

      it('Then should return the expected response', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that does exist in stock', () => {
      let actualResponse;

      const expectedResponse = {
        sku: mockedInStockSku,
        qty: mockedFirstTransaction.qty
      };

      beforeEach(() => app(mockedInStockSku).then(response => actualResponse = response));

      it('Then should return the expected response', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });
  });

  afterEach(() => {
    jest.resetModules();
  });
});
