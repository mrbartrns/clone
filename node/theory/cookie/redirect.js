const http = require('http');

http.createServer((req, res) => {
    res.writeHead(302, {'Location': 'https://www.google.com'}); // redirect is 302
    res.end();
}).listen(3000, () => console.log('Server running at 3000'));