const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'Company'
});

app.get('/', (req, res) => {
    fs.readFile('index.ejs', 'utf8', (err, data) => {
        if (err) throw err;
        client.query('SELECT * FROM merchandise', (error, results) => {
            if (error) throw error;
            console.log(results);
            res.end(ejs.render(data, {data: results}));
        })
    })
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    client.query('DELETE FROM merchandise WHERE id=?', [id], () =>{
        res.redirect('/');
    })
});

app.get('/insert', (req, res) => {
    fs.readFile('additem.html', 'utf8', (err, data) => {
        if(err) throw err;
       res.end(data);
    })
});
app.post('/insert', (req, res) => {
    const body = req.body;
    client.query('INSERT INTO merchandise (name, modelnumber, series) VALUES (?, ?, ?)', [
        body.name, body.modelnumber, body.series
    ], () => {
        res.redirect('/');
    })
});
app.get('/edit/:id', (req, res) => {
    fs.readFile('edit_products.ejs', 'utf8', (err, data) => {
        client.query('SELECT * FROM merchandise WHERE id=?', [req.params.id],
        (error, results) => {
            res.end(ejs.render(data, {data: results[0]}));
        });
    });
});
app.post('/edit/:id', (req, res) => {
    const body = req.body;
    client.query('UPDATE merchandise SET name=?, modelnumber=?, series=? WHERE id=?', [
        body.name, body.modelnumber, body.series, req.params.id
    ], () => {
        res.redirect('/');
    });
});

app.listen(3000, () => console.log(3000));