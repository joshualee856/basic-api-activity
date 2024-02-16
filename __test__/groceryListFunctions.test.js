const { groceryList, addItem } = require('../src/groceryListFunctions');

afterEach(() => {
    groceryList.splice(0, groceryList.length);
});

describe('Add Item Tests', () => {
    test('Adding one new item should put the item into the last index of the grocery list', () => {
        // Arrange
        let name = 'apple';
        let price = 2.00;
        
        addItem(name, price);
        let result = groceryList[ groceryList.length - 1 ];

        expect(result).toEqual({ name: 'apple', price: parseFloat(price).toFixed(2), quantity: 1, purchased: false })
    })

    test('Adding two new items have two items pushed to the grocery list', () => {
        let name1 = 'apple';
        let price1 = 2.00;
        let name2 = 'milk';
        let price2 = 10.00;

        addItem(name1, price1);
        addItem(name2, price2);
        let result = groceryList;

        expect(result).toEqual([ 
            { name: 'apple', price: parseFloat(price1).toFixed(2), quantity: 1, purchased: false }, 
            { name: 'milk', price: parseFloat(price2).toFixed(2), quantity: 1, purchased: false }
        ])
    })
    
    test('Adding two of the same item should only push the first item to the list, and the second item only updates the quantity of the item in the list',
    ()=> {
        let name = 'apple';
        let price = 2.00;
        
        addItem(name, price);
        addItem(name, price);
        let result = groceryList[ groceryList.length - 1 ];

        expect(result).toEqual({ name: 'apple', price: parseFloat(price).toFixed(2), quantity: 2, purchased: false })
    })
})