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
    client.query('SELECT boardname FROM boardnames where boardname=?', [boardName], (error, result) => {
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

// 콘텐츠 내용을 보여주는 라우터
router.get('/:boardname/:articlenumber', (req, res) => {
    let data = {};
    client.query('SELECT * FROM articles WHERE boardname=? AND articlenumber=?', [req.params.boardname, req.params.articlenumber], (error, result) => {
        if (error) throw error;
        data.title = result[0].title;
        data.userid = result[0].userid;
        data.date = result[0].date;
        data.article = result[0].text;
        data.articlenumber = result[0].articlenumber;
        console.log(data);
        res.render('article', {data: data});
    });
});





// router.post('/del')

module.exports = router;
