const { EPROTONOSUPPORT } = require('constants');
const crypto = require('crypto');
const mysql = require('mysql');
// const cookieParser = require('cookie-parser');


const client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'boards'
});

function base64crypto(password) {
    return crypto.createHash('sha512').update(password).digest('base64');
}

exports.getLogin = (req, res) => {
    if (req.session.logined) {
        res.render('logout', {session: req.session});
        console.log(req.cookies);
    } else {
        res.render('login', {session: req.session});
    }
}

exports.login = (req, res) => {
    const userinfo = {
        id: req.body.id,
        pw: base64crypto(req.body.pw)
    };

    client.query('SELECT * FROM userinfo WHERE userid=? AND password=?', [userinfo.id, userinfo.pw], (error, result) => {
        if (result.length === 0) return;
        req.session.regenerate(err => {
            req.session.logined = true;
            req.session.user_id = userinfo.id;
            res.redirect('/login');
        });
    });
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

exports.getSignup = (req, res) => {
    if (req.session.logined) return;
    res.render('signup');
}

exports.signup = (req, res) => {
    const userinfo = {
        id: req.body.id,
        pw: base64crypto(req.body.pw)
    };
    client.query('INSERT INTO userinfo (userid, password) VALUES (?, ?)', [userinfo.id, userinfo.pw]);
    res.redirect('/login');
}

exports.getRevise = (req, res) => {
    if (req.session.logined && req.session.user_id) {
        res.render('revision', {id: req.session.user_id});
    } else {
        res.status(404);
        res.send(false);
    }
}

exports.revise = (req, res) => {
    const userinfo = {
        id: req.session.user_id,
        pw: base64crypto(req.body.pw),
        email: req.body.email
    };

    client.query('UPDATE userinfo SET password=?, email=? WHERE userid=?', [userinfo.pw, userinfo.email, userinfo.id], (error, result) => {
        if (error) throw error;
        console.log(result.message);
        console.log('success');
        req.session.destroy();
    });
    res.redirect('/login');
}