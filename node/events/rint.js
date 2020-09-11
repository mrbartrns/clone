// EventEmitter 객체 생성
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

exports.timer = new MyEmitter();

setInterval(() => {
    exports.timer.emit('tick');
}, 1000);