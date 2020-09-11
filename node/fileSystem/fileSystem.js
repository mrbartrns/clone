const fs = require('fs');

// readFile(file, encoding, callback) => read file asynchronously
// readFileSync(file, encoding) => read file synchronously
// writeFile(file, data, encoding, callback) => write file asynchronously
// writeFileSync(file, data, encoding) => write file syncfhrounously

// const text = fs.readFileSync('textfile.txt', 'utf8');
// fs.readFile('textfile.txt', 'utf8', (err, data) => {
    // if(err) {return console.log(err)};
//     console.log(data, '1');
// });
// console.log(text);

const text = 'hello, world!';
fs.writeFile('textWrite.txt', text, 'utf8', (err) => {
    if (err) {console.log(err)}; // early return
    console.log('WRITE FILE ASYNC COMPLETE'); // else
});

fs.writeFileSync('textWriteSync.txt', text, 'utf8');
console.log('WRITE FILE SYNC COMPLETE');