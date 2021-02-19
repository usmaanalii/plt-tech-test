const generateMockedStockItem = (sku, stock) => ({ sku, stock });
const generateMockedTransactionItem = (sku, type, qty) => ({ sku, type, qty });

const mockImports = (stock, transactions) => {
  jest.doMock('./stock', () => ({ stock }));
  jest.doMock('./transactions', () => ({ transactions }));
}

describe('Given the app', () => {
  let app;

  describe('When imported as a node module', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    describe('And when calling app with an sku that does NOT exist', () => {
      let actualError;

      const mockedStock = [
        generateMockedStockItem('some mocked stock item sku', 'some mocked stock item stock')
      ];

      const mockedTransactions = [
        generateMockedTransactionItem(
          'some mocked transaction item sku',
          'some mocked transaction item type',
          'some mocked transaction item qty'
          )
      ];

      const mockedIncorrectSku = 'some mocked incorrect sku';

      const expectedError = 'This sku does not exist';

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedIncorrectSku).catch(error => actualError = error)
      });

      it('Then should return the expected error', () => {
        expect(actualError).toBe(expectedError)
      });
    });

    describe('And when calling app with an sku that has at least one transaction but is NOT in stock', () => {
      let actualResponse;

      const mockTransactionItemSku = 'some mocked transaction item sku';

      const mockedStock = [];

      const mockedTransactions = [
        generateMockedTransactionItem(
          mockTransactionItemSku,
          'some mocked transaction item type',
          'some mocked transaction item qty'
          )
      ];

      const expectedResponse = {
        sku: mockTransactionItemSku,
        qty: 0
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockTransactionItemSku).then(response => actualResponse = response)
      });

      it('Then should return the expected sku with a 0 qty', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that has a single "order" transaction AND NO "refund" transactions', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedTransactionQty = 10;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'order', mockedTransactionQty)
      ];

      const expectedQty = mockedStockItemStock - mockedTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that has NO "order" transactions AND a single "refund" transaction', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedTransactionQty = 10;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'refund', mockedTransactionQty)
      ];

      const expectedQty = mockedStockItemStock + mockedTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that has more than one "order" transaction and NO "refund" transactions', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedFirstTransactionQty = 10;
      const mockedSecondTransactionQty = 20;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'order', mockedFirstTransactionQty),
        generateMockedTransactionItem(mockedSku, 'order', mockedSecondTransactionQty)
      ];

      const expectedQty = mockedStockItemStock - mockedFirstTransactionQty - mockedSecondTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that has NO "order" transactions AND more than one "refund" transaction', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedFirstTransactionQty = 10;
      const mockedSecondTransactionQty = 20;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'refund', mockedFirstTransactionQty),
        generateMockedTransactionItem(mockedSku, 'refund', mockedSecondTransactionQty)
      ];

      const expectedQty = mockedStockItemStock + mockedFirstTransactionQty + mockedSecondTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that has a single "order" transaction AND a single "refund" transaction', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedFirstTransactionQty = 10;
      const mockedSecondTransactionQty = 20;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'order', mockedFirstTransactionQty),
        generateMockedTransactionItem(mockedSku, 'refund', mockedSecondTransactionQty)
      ];

      const expectedQty = mockedStockItemStock - mockedFirstTransactionQty + mockedSecondTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
          expect(actualResponse).toEqual(expectedResponse)
        });
    });

    describe('And when calling app with an sku that has a single "order" AND more than one "refund" transaction', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedFirstTransactionQty = 10;
      const mockedSecondTransactionQty = 20;
      const mockedThirdTransactionQty = 30;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'order', mockedFirstTransactionQty),
        generateMockedTransactionItem(mockedSku, 'refund', mockedSecondTransactionQty),
        generateMockedTransactionItem(mockedSku, 'refund', mockedThirdTransactionQty)
      ];

      const expectedQty = mockedStockItemStock - mockedFirstTransactionQty + mockedSecondTransactionQty + mockedThirdTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
        expect(actualResponse).toEqual(expectedResponse)
      });
    });

    describe('And when calling app with an sku that has a more than one "order" transaction AND a single "refund" transaction', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedFirstTransactionQty = 10;
      const mockedSecondTransactionQty = 20;
      const mockedThirdTransactionQty = 30;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'refund', mockedFirstTransactionQty),
        generateMockedTransactionItem(mockedSku, 'order', mockedSecondTransactionQty),
        generateMockedTransactionItem(mockedSku, 'order', mockedThirdTransactionQty)
      ];

      const expectedQty = mockedStockItemStock + mockedFirstTransactionQty - mockedSecondTransactionQty - mockedThirdTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
        expect(actualResponse).toEqual(expectedResponse)
      });
    });

    describe('And when calling app with an sku that has a more than one "order" transaction AND more than one "refund" transaction', () => {
      let actualResponse;

      const mockedSku = 'some mocked sku' ;
      const mockedStockItemStock = 100;
      const mockedStock = [
        generateMockedStockItem(mockedSku, mockedStockItemStock)
      ];

      const mockedFirstTransactionQty = 10;
      const mockedSecondTransactionQty = 20;
      const mockedThirdTransactionQty = 30;
      const mockedFourthTransactionQty = 40;
      const mockedTransactions = [
        generateMockedTransactionItem(mockedSku, 'order', mockedFirstTransactionQty),
        generateMockedTransactionItem(mockedSku, 'order', mockedSecondTransactionQty),
        generateMockedTransactionItem(mockedSku, 'refund', mockedThirdTransactionQty),
        generateMockedTransactionItem(mockedSku, 'refund', mockedFourthTransactionQty)
      ];

      const expectedQty = mockedStockItemStock - mockedFirstTransactionQty - mockedSecondTransactionQty + mockedThirdTransactionQty + mockedFourthTransactionQty;

      const expectedResponse = {
        sku: mockedSku,
        qty: expectedQty
      };

      beforeEach(() => {
        mockImports(mockedStock, mockedTransactions);

        ({ app } = require('./app'));

        app(mockedSku).then(response => actualResponse = response)
      });

      it('Then should return the sku with the correctly calculated qty', () => {
        expect(actualResponse).toEqual(expectedResponse)
      });
    });
  });
});
