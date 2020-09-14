const http = require('http');
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>Hello from createAndResponse.js file!</h1>');
// });
// server.listen(3000, () => console.log('Server Started'));
const server = http.createServer();

// 요청시 상태와 정보를 보낸다.
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>Hello from independent request events.</h1>');
});

// => same results with above comments
server.listen(3000, () => console.log('Server Started'));