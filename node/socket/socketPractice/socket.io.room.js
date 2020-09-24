const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    fs.readFile('room.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}).listen(3000, () => console.log(3000));

const io = socketio.listen(server);

io.on('connection', (socket) => {
    let roomNumber = null;
    socket.emit('welcome', 'welcome!');
    socket.on('channel', (room) => {
        roomNumber = room;
        console.log(roomNumber);
        socket.join(room);
    });
    socket.on('message', (message) => {
        const object = {
            date: (new Date()).toUTCString(),
            id: socket.id,
            text: message
        }
        io.in(roomNumber).emit('send', object);
    });
});