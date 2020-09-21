const express = require('express');
const pug = require('pug');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');

const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'Company'
});

const app = express();
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
    fs.readFile('list.pug', 'utf8', (err, data) => {
        if(!data) console.log(err);
        // database query를 실행
        client.query('SELECT * FROM Products', (err, res) => {
            res.send(pug.renderFile(data, {data: res}));
        })
    })
});
app.get('/delete/:id', (req, res) => {});
app.get('/insert', (req, res) => {});
app.post('/insert', (req, res) => {});
app.get('/edit/:id', (req, res) => {});
app.post('/edit/:id', (req, res) => {});

app.listen(3000, () => console.log(3000));