const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const router = express.Router();

let today = (new Date()).getDate();
let newDay = false;
let subNumber = 0;

function getArticleNumber() {
    const date = new Date();
    if (today === (new Date()).getDate()) {
        newDay = true;
        today = (new Date()).getDate();
    }

    if (newDay) {
        subNumber = 0;
        newDay = false;
    } else {
        subNumber++;
    }

    const articleNumber = `${date.getFullYear()}${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth}${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}${subNumber}`;
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
        boardname: req.body.board,
        boardtitle: req.body.boardtitle,
        article: req.body.article,
        articleNumber: getArticleNumber()
    }
    console.log(articleObj);

    client.query('INSERT INTO articles (boardname, userid, title, date, articlenumber, text) VALUES (?, ?, ?, NOW(), ?, ?)', [
        articleObj.boardname, articleObj.userid, articleObj.boardtitle, articleObj.articleNumber, articleObj.article
    ]);
    res.redirect(`../../../board/${articleObj.boardname}/${articleObj.articleNumber}`);
});

module.exports = router;