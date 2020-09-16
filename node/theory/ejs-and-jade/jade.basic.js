const http = require('http');
const fs  = require('fs');
const jade = require('jade');

http.createServer((req, res) => {
    fs.readFile('jadePage.jade', 'utf8', (err, data) =>{
        if (!data) {console.log(err)}
        const fn = jade.compile(data);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(fn({name: 'something', description: 'test script'}));
    });
}).listen(3000, () => console.log(3000));