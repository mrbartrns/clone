const url = require('url');
const util = require('util');


// 자바스크립트에서 키와 값을 갖는 자료형(dict)을 hash라고 한다.
// 전자지문 (crypto module)
const parsedObject = url.parse('https://www.google.com', true);
const data = util.format(`${23 + 24}`);
console.log(parsedObject);
console.log(data);