const { logger } = require('./util/logger')

const groceryList = [];

function addItem(name, price) {
    let inList = false;
    let itemIndex;
    for (let i = 0; i < groceryList.length; i++) {
        if (groceryList[i].name === name) {
            itemIndex = i;
            inList = true;
        }
    }

    if (inList) {
        groceryList[itemIndex].quantity += 1;
    } else {
        const newItem = {
            name,
            price: parseFloat(price).toFixed(2),
            quantity: 1,
            purchased: false,
        }

        groceryList.push(newItem);
    }
    
    logger.info(`Added item: '${name}' to the grocery list`);
    return `${name} has been added to the grocery list!`;
};

module.exports = {
    groceryList,
    addItem,
}