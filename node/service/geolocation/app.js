const http = require('http');
const fs = require('fs');
const express = require('express');
const socketio = require('socket.io');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);

const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'location'
});

// get - tracker
app.get('/tracker', (req, res) => {
    fs.readFile('tracker.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

// get - observer
app.get('/observer', (req, res) => {
    fs.readFile('observer.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

// get - showdata => 데이터베이스에서 특정 사용자 위치를 추출해 JSON 파일을 제공
app.get('/showdata', (req, res) => {
    // data는 []형식으로 json형식임. where => object
    client.query('SELECT * FROM WHERE name=?', [req.params.name], (err, data) =>{
        if (err) throw err;
        res.send(data);
    })
});

server.listen(3000, () => console.log(3000));

const io = socketio.listen(server);

io.on('connection', socket => {
    socket.on('join', data => {
        socket.join(data);
    });

    socket.on('location', data => {
        client.query('INSERT INTO locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())', [data.name, data.latitude, data.longitude]);
        io.in(data.name).emit('receive', {
            latitude: data.latitude,
            longitude: data.longitude,
            date: Date.now()
        });
    })
});