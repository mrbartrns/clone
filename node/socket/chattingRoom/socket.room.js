const fs = require('fs');
const server = require('http').createServer((req, res) => {
    fs.readFile('HTMLPage.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});
const io = require('socket.io').listen(server);

// not working
// server.on('request', (req, res) => {
//     fs.readFile('HTMLPage.html', (err, data) => {
//         if (err) throw err;
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data);
//     });
// });

io.sockets.on('connection', (socket) => {
    let roomName = null;
    // join 이벤트는 클라이언트가 특정한 방에 접속하게 만드는 이벤트, 이때 방 이름을 함께 저장
    socket.on('join', data => {
        roomName = data;
        socket.join(data);
    });

    // message 이벤트는 같은 방에 속한 클라이언트가 메시지를 전달하는 이벤트 (사용자 정의 이벤트)
    socket.on('message', data => {
        io.sockets.in(roomName).emit('message', 'test');
        console.log(typeof(data));
    });
});


server.listen(3000, () => console.log('server listening at port 3000'));