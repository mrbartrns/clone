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
    })
});

// get - observer
app.get('/observer', (req, res) => {

});

// get - showdata
app.get('/showdata', (req, res) => {

});

const io = socketio.listen(server);

server.listen(3000, () => console.log(3000));