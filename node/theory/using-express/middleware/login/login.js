const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { response } = require('express');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    if(req.cookies.auth) {
        res.send('<h1>login Success</h1>');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    fs.readFile('login.html', (err, data) => {
        if (!data) {console.log(err)}
        res.send(data.toString());
    });
});

app.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    console.log(login, password);
    console.log(req.body);

    if(login === 'rint' && password ==='hi') {
        res.cookie('auth', true);
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, () => console.log(3000));