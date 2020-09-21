// 쿠키가 클라이언트 웹 브라우저에 정보를 저장하는 기술이라면, 세션은 서버에 정보를 저장하는 기술
// 일반적으로 세션은 클라이언트에 세션 식별자 쿠키를 부여함
// 부여한 세션 식별자 쿠키와 대응되는 서버에 위치하는 별도 저장소에 데이터를 저장
// express-session middleware는 세션을 쉽게 생성할 수 있게 도와주는 미들웨어
// request 객체에 session 속성 부여

// module import
const express = require('express');
const session = require('express-session');

const app = express();

app.listen(3000, () => console.log(3000));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res) => {
    req.session.now = (new Date()).toUTCString();
    res.json(req.session);
})