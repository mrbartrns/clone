const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    if (pathName === '/') {
        fs.readFile('./root/page1.html', (err, data) => {
            if(!data) {console.log(err);}
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else if (pathName ==='/otherpage') {
        fs.readFile('./root/page2.html', (err, data) => {
            if(!data) {console.log(err);}
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        })
    }
}).listen(3000, () => console.log('Server running at 3000 port'));
// http.createServer((req, res) => {
//     console.log(req);
// }).listen(3000, console.log('3000'));