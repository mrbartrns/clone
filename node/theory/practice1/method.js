const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h1>${JSON.stringify(query)}</h1>
    <h2>${JSON.stringify(url.parse(req.url))}</h2>`);
    })
    .listen(3000, () => {
        console.log('Server running at port 3000');
    });