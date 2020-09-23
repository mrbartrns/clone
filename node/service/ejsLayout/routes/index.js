const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { route } = require('../../jadeLayout/app');

// routes에 mysql require 할것
const client = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'Company'
});

/* GET home page. */
router.get('/', (req, res, next) => {
  client.query('SELECT * FROM merchandise', (error, results) =>{
    if (error) throw error;
    res.render('index', {
      title: 'Index Page',
      data: results
    });
  });
});

router.get('/insert', (req, res) => {
  res.render('insert', {title: 'Insert Page'});
});

router.post('/insert', (req, res) => {
  const body = req.body;
  client.query('INSERT INTO merchandise (name, modelnumber, series) VALUES (?, ?, ?)', [body.name, body.modelnumber, body.series], (error, results) =>{
    if (error) throw error;
    res.redirect('/');
  });
});

router.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  client.query('DELETE FROM merchandise WHERE id=?', [id], (error, results) => {
    if (error) throw error;
    res.redirect('/');
  });
});

router.get('/edit/:id', (req, res) => {
  client.query('SELECT * FROM merchandise WHERE id = ?', [req.params.id], (error, results) => {
    if (error) throw error;
    res.render('edit', {
      data: results[0]
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const body = req.body;
  client.query('UPDATE merchandise SET name=?, modelnumber=?, series=? WHERE id=?', [body.name, body.modelnumber, body.series, req.params.id], (error) => {
    if (error) throw error;
    res.redirect('/');
  });
});

module.exports = router;
