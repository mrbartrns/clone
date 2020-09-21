const http = require('http');
const express = require('express');
const app = express();

app.use((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello, Express</h1>');
}).listen(3000, () => console.log(3000));

// app.use((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>This is p2</h1>');
// }).listen(3001, () => console.log(3001));

// using other server with express server
// http.createServer(app).listen(3000, () => something)