const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// const { io } = require('../app');

const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'userinfo'
});

router.get('/', (req, res, next) => {
    res.render('login');
  });

router.post('/', (req, res) => {
    const id = req.body.userid;
    const password = req.body.userpassword;
    client.query('SELECT userid, userpassword FROM useridentification WHERE userid=? and userpassword=?', 
    [id, password], (error, data) => {
        if (error) throw error;
        if (!data) {
            res.redirect('error');
        } else {
            res.redirect('../'); // some information과 함께 넘겨줘야 함
        }
    });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// id 중복확인을 할때 실시간으로 하는법 또는 버튼을 눌러서 하는법

router.post('/signup', (req, res) => {
    // 유저 정보 등록
});
  
module.exports = router;