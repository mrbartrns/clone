const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');
const mysql = require('mysql');

const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'chat'
});

const server = http.createServer((req, res) => {
    fs.readFile('server.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}).listen(3000, () => console.log(3000));

const io = socketio.listen(server);

// 일반
io.sockets.on('connection', (socket) => {
    socket.emit('login', 'Welcome!'); // 로그인한 사람에게만 환영 인사를 보냄
    socket.on('message', (data) => {
        client.query('INSERT INTO twits (date, userid, text) VALUES (now(), ?, ?)', [socket.id, data], (error) =>{
            if (error) throw error;
        });
            client.query('SELECT * FROM twits WHERE userid=? && text = ?', [socket.id, data], (error, results) => {
                console.log(results);
                const resultObject = {
                    date : results[0].date,
                    userid : results[0].userid,
                    text: results[0].text
                }
                console.log(resultObject);
                io.emit('send', resultObject);
            });

    });
});