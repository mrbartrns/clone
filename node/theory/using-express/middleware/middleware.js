// express module은 이벤트 리스너를 연결하는데 use를 사용한다.
// use()는 여러번 사용이 가능하고, request, response, next 세개의 인자를 받는다. next는 다음에 위치하는 함수이다.

const express = require('express');
const app = express();

// app.use((req, res, next) => {
//     console.log(1);
//     next();
// });

// app.use((req, res, next) => {
//     console.log(2);
//     next();
// });

// app.use((req, res, next) => {
//     console.log(3);
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>hello, world</h1>');
// });

// app.listen(3000, () => console.log(3000));

// use method의 매개변수로 입력한 함수가 차례대로 실행된다.
// 요청의 응답을 완료하기 전까지 여러일의 처리가 가능
// 미들웨어에서 request 객체와 response 객체에 속성 또는 메서드를 추가하면 다른 미들웨어에서도 추가한 속성과 메서드 사용이 가능

app.use((req, res, next) => {
    req.number = 52;
    res.number = 273;
    next();
});

app.use((req, res, next) => {
    res.send(`<h1>${req.number}: ${res.number}</h1>`);
});

app.listen(3000, () => console.log(3000));

// request 객체에 임의의 키와 값의 추가 가능, response 객체 또한 마찬가지 이다.
// 미들웨어를 사용하면 특정한 작업을 수행하는 모듈의 분리가 가능. > 재사용이 가능