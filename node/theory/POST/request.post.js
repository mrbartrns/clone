// POST 방식은 GET방식과 달리 데이터를 더 많이 담을 수 있고, 보안측면에서 좋다
// GET 방식은 요청하면서 매개변수 형식으로 노출되어 데이터를 전달하지만, POST방식은 요청한 후 데이터를 별도로 전달
// request 이벤트가 발생한 후 request 객체의 data이벤트로 데이터가 전달

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./POST/HTMLpage2.html', (err, data) => {
            if (!data) {console.log(err)}
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (req.method === 'POST') {
        req.on('data', (data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`<h1>${data}</h1>`);
            // POST를 통해 받은 데이터는 query 문자열 형태로 들어오게 된다. 따라서 queryStringModule을 사용하면 쿼리 문자열을 분해해 원하는 대로 사용이 가능
        });
    }
})
.listen(3000, () => {
    console.log('Server running at port 3000');
})