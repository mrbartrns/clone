const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const router = express.Router();

function getArticleNumber() {
    const date = new Date();
    const articleNumber = date.getFullYear() + date.getMonth() + date.getDate()
    `${Math.floor(Math.random() * (99999999 - 10000000) + 10000000)}`;
    console.log(articleNumber);
    return articleNumber;
}

const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'boards'
});

router.get('/postarticle', (req, res) => {
    client.query('SELECT boardname FROM boardnames', (error, boardNameList) => {
        if (error) throw error;
        res.render('boardpost', {boardNameList: boardNameList});
    });
});

router.post('/postarticle/post', (req, res) => {
    const articleObj = {
        userid: req.body.userid,
        boardname: req.body.boardname,
        boardtitle: req.body.boardtitle,
        article: req.body.article
    }
    let isSameNumber = true;
    let articleNumber = getArticleNumber();
    while (isSameNumber) {
        client.query('SELECT articlenumber FROM articletexts WHERE articlenumber=?', [articleNumber], (error, result) => {
            if(!results) {
                isSameNumber = false;
            } else {
                articleNumber = getArticleNumber();
            }
        });
    };
    client.query('INSERT INTO articles (boardname, userid, title, articlenumber, date) VALUES (?, ?, ?, ?, NOW()', [
        articleObj.boardname, articleObj.userid, articleObj.boardtitle, articleNumber
    ]);
    client.query('INSERT INTO articletexts (articlenumber, text) VALUES (?, ?)', [articleNumber, articleObj.article]);
    res.redirect(`../board/${articlenumber}`);
});

module.exports = router;