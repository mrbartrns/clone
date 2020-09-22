const express = require('express');
const ejs = require('ejs');
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

// client.query('SELECT * FROM Products', (err, res) => {
//     if(err) throw err;
//     console.log(res);
// });

app.get('/', (req, res) => {
    fs.readFile('list_test.ejs', 'utf8', (err, data) => {
        if (!data) throw err;
        client.query('SELECT * FROM Products', (error, results) => {
            if (!results) throw err;
            res.end(ejs.render(data, {data: results}));
        });
    });
});

app.get('/delete/:id', (req, res) => {
    client.query('DELETE FROM Products WHERE id=?', [req.params.id], () => {
        res.redirect('/');
    });
});

app.get('/insert', (req, res) => {
    fs.readFile('insert.html', 'utf8', (err, data) => {
        if(!data) throw err;
        res.end(data); //send말고 end를 써야함
    })
});

app.post('/insert', (req, res) => {
    const body = req.body;

    client.query('INSERT INTO Products (name, modelnumber, series) VALUES (?, ?, ?)', [
        body.name, body.modelnumber, body.series
    ], () => {
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    fs.readFile('edit.ejs', 'utf8', (err, data) => {
        if(err) throw err;
        client.query('SELECT * FROM Products WHERE id = ?', [req.params.id], (error, result) => {
            res.end(ejs.render(data, {data: result[0]}));
        });
    });
});

app.post('/edit/:id', (req, res) => {
    const body = req.body;

    client.query('UPDATE Products SET name=?, modelnumber=?, series=? WHERE id = ?', [
        body.name, body.modelnumber, body.series, req.params.id
    ], () => {
        res.redirect('/');
    });
});

app.listen(3000, () => console.log(3000));