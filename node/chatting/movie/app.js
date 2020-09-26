let seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
]

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res, next) => {
    fs.readFile('vanillahtml.html', (err, data) => {
        res.end(data);
    });
});

app.get('/seats', (req, res, next) => {
    res.send(seats);
});

server.listen(3000, () => console.log('server running at port 3000'));

const io = socketio.listen(server);
io.on('connection', (socket) => {
    socket.on('reserve', data => {
        seats[data.y][data.x] = 2;
        io.emit('reserve', data);
    });
    socket.on('cancel', data => {
        seats[data.y][data.x] = 1;
        io.emit('cancel', data);
    })
})