const rint = require('./rint');

rint.timer.on('tick', (code) => {
    console.log('event');
});

process.on('exit', (code) => {
    console.log('exit');
});