const { logger } = require('./util/logger')

const shoppingList = [];

function addItem(name, price) {
    const newItem = {
        name,
        price: parseFloat(price).toFixed(2),
        purchased: false,
    }
    
    shoppingList.push(newItem);
    logger.info(`Added item: ${newItem}`);
    return `${name} has been added to the grocery list!`;
};

module.exports = {
    shoppingList,
    addItem,
}