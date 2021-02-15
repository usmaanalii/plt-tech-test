const mockedFirstStockItemSku = 'some mocked first stock item sku';
const mockedFirstStockItemStock = 'some mocked first stock item stock';

const mockFirstStockItem = {
  sku: mockedFirstStockItemSku,
  stock: mockedFirstStockItemStock
};

const mockedStock = [
  mockFirstStockItem
];

const mockedFirstTransactionItemSku = 'some mocked first transaction item sku';
const mockedFirstTransactionItemType = 'some mocked first transaction item type';
const mockedFirstTransactionItemQty = 'some mocked first transaction item quantity';

const mockedFirstTransaction = {
  sku: mockedFirstTransactionItemSku,
  type: mockedFirstTransactionItemType,
  qty: mockedFirstTransactionItemQty
};

const mockedTransactions = [
  mockedFirstTransaction
];

const mockedIncorrectSku = 'some mocked incorrect sku';

const expectedError = 'This sku does not exist';

describe('Given the app', () => {
  let app;

  beforeEach(() => {
    jest.doMock('./stock', () => ({
      stock: mockedStock
    }));
  });

  describe('When imported as a node module', () => {
    beforeEach(() => {
      ({ app } = require('./app'));
    });

    it('Then should be a function', () => {
      expect(app).toBeInstanceOf(Function);
    });

    describe('And when calling app with an sku that does NOT exist', () => {
      let actualError;

      beforeEach(() => app(mockedIncorrectSku).catch(error =>actualError = error));

      it('Then should return the expected error', () => {
        expect(actualError).toBe(expectedError)
      });
    });

    describe('And when calling app with an sku that does exist', () => {
      let actualResponse;

      const expectedResponse = mockFirstStockItem;

      beforeEach(() => app(mockedFirstStockItemSku).then(response => actualResponse = response));

      it('Then should return the expected response', () => {
        expect(actualResponse).toBe(expectedResponse)
      });
    });
  });

  afterEach(() => {
    jest.resetModules();
  });
});
