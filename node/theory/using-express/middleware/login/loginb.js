const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    if (req.cookies.auth) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<h1>Welcome!</h1>`);
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    fs.readFile('login.html', (err, data) => {
        if (!data) console.log(err);
        // not a SEND > END
        res.end(data);
    });
});

// get user information when post request
app.post('/login', (req, res) => {
    const id = req.body.login;
    const password = req.body.password;
    if (id !== 'hi' && password !== 'name') {
        res.redirect('/login');
    } else {
        res.cookie('auth', true, 'hi', 'name');
        res.redirect('/');
    }
});

app.listen(3000, () => console.log(3000));