const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('lobby');
});

// req.params.room
app.get('/canvas/:room', (req, res) => {
    res.render('canvas', {room: req.params.room});
});

app.get('/room', (req, res) => {
    // send json
    console.log(Object.keys(io.sockets.adapter.rooms));
    const rooms = Object.keys(io.sockets.adapter.rooms).filter(item => item.indexOf('/') < 0);
    console.log(Object.keys(io.sockets.adapter.rooms));
    res.send(rooms);
})

server.listen(3000, () => console.log(3000));

const io = socketio.listen(server);

io.on('connection', (socket) => {
    let roomId;

    // into room
    socket.on('join', (data) =>{
        socket.join(data);
        roomId = data;
        console.log(data);
    });

    // get a location of mouse x, y
    socket.on('draw', (data) => {
        io.in(roomId).emit('line', data);
        console.log(data);
    });

    // 모든 접속한 사람들에게 이벤트 전달
    socket.on('createRoom',(data) => {
        console.log(data);
        io.emit('createRoom', data.toString());
    })
});