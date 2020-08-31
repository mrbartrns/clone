const faker = require('faker');
let productList = [];
for (let i = 0; i < 10; i++) {
    const productName = faker.commerce.productName();
    const price = faker.commerce.price(0, 1000, 2, '$');
    const nameAndPrice = `${productName} - ${price}`;
    productList.push(nameAndPrice);
}
console.log(productList);