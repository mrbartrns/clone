const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');


const app = express();

const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
    secret: 'keboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));

app.get('/login', router.getLogin);
app.post('/login', router.login);
app.post('/logout', router.logout);
app.get('/signup', router.getSignup);
app.post('/signup', router.signup);
app.get('/revise', router.getRevise);
app.post('/revise', router.revise);

server.listen(3000, () => console.log(3000));