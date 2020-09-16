// 모듈 추출
const express = require('express');

// 서버를 생성
const app = express();

// //미들웨어 설정
// app.use((req, res) => {
//     // user agent 속성을 추출
//     const agent = req.header('User-Agent');
//     // console.log('headers:', req.headers);
//     console.log(agent);
//     // match is regExp func;
//     if (agent.toLowerCase().match(/chrome/gi)) {
//         res.send('<h1>Hello, chrome</h1>');
//     } else {
//         res.send('<h1>Hello, Express</h1>');
//     }
//     // res.sendStatus(200);
// });

app.use((req, res) => {
    console.log(req.params);
    res.sendStatus(200);
})

app.listen(3000, () => {
    console.log(3000);
})

// 사용자가 특정 웹 브라우저를 사용할 때 라는 필터 기능 구현 가능, 이를 구현하면 같은 경로로 접속하더라도 모바일과 데스크톱의 페이지 구별 가능
// robots.txt를 무시하는 검색엔진이 무단으로 웹 페이지를 탐색하는 것을 막을 수 있고 간단한 해킹에도 대비