const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = require('../app');
const router = express.Router();

const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'boards'
});

router.get('/:boardname', (req, res) => {
    const boardName = req.params.boardname;
    client.query('SELECT boardname FROM boardnames where boardName=?', [boardName], (error, result) => {
        if (!result) {
            res.status(404);
            res.render('error');
        } else {
            client.query('SELECT * FROM articles WHERE boardname=?', [boardName], (error, result) => {
                if (error) throw error;
                console.log(result);
                res.render('board', {
                    boardname: boardName,
                    articles: result
                });
            });            
        }
    });
});

// show article article > 임의의 8자리 번호 1:1 매칭 후 번호와 article을 따로 저장
router.get('/:articlenumber', (req, res) => {
    const data = {};
    client.query('SELECT * FROM articletexts WHERE articlenumber=?', [req.params.articlenumber], (error, result) => {
        if (error) throw error;
        data.articleNumber = result[0].articlenumber;
        data.text = result[0].text;
    });
    client.query('SELECT * FROM articles WHERE articlenumber=?'[req.params.articlenumber], (error, result) => {
        data.title = result[0].title;
        data.userid = result[0].userid;
        data.date = result[0].date;
        res.render('article', {data: data});
    });
});





// router.post('/del')

module.exports = router;
