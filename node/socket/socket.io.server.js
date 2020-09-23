const socketio = require('socket.io');
const http = require('http');
const fs = require('fs');

// create socketserver
const server = http.createServer((req, res) => {
    fs.readFile('HTMLPage.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(data);
        console.log('connected');
    });
}).listen(3000, () => {
    console.log('Server Running at port 3000');
});

// connect event
// connection event는 클라이언트가 웹 소켓 서버에 접속할 때 발생한다.
// 소켓 서버의 생성 및 실행
// socket.io 모듈의 listen 메서드의 매개변수에는 웹 소켓 서버 포트 번호를 입력할 수 있지만, 일반적으로 웹 서버와 함께 사용하므로 server객체를 매개변수로 입력한다.
let id = 0;
const io = socketio.listen(server);
// io.sockets.on('connection', (socket) => {
//     /// 이벤트를 받음
//     socket.on('rint', (data) => {
//         console.log('Client Send Data:', data);
//         // 이벤트를 발생시킴
//         // socket.emit('smart', data);
//         // public events
//         // io.sockets.emit('smart', data);
//         // broadcast event
//         socket.broadcast.emit('smart', data);
//     });
// private event
io.sockets.on('connection', (socket) => {
    id = socket.id;
    console.log(id);

    socket.on('rint', data => {
        io.sockets.to(id).emit('smart', data);
    })
})