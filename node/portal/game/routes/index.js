const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const router = express.Router();

const client = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'boards'
});

/* GET home page. */
router.get('/', (req, res, next) => {
  client.query('SELECT boardname FROM boardnames', (error, result) => {
    if (error) throw error;
    console.log(result);
    res.render('index', {
      title: 'Game Portal',
      boards: result
    });
  });
});

router.get('/manageboard', (req, res) => {
  fs.readFile('public/add.html', (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

router.post('/addboard', (req, res) => {
  const boardName = req.body.boardname;
  client.query('INSERT INTO boardnames (boardname) VALUES (?)', [boardName]);
  res.redirect('/');
});

module.exports = router;
