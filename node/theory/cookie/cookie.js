// 쿠키 생성
// 쿠키는 키와 값이 들어있는 작은 데이터 조각으로 이름, 값, 파기날짜와 경로 정보가 있음
// response 객체를 사용하면 클라이언트에 쿠키 할당이 가능 > 응답 헤더의 Set-Cookie 속성을 사용
// Name = Value; Expires = date; Domain = http://..; Path = something; Secure

const http = require('http');
http.createServer((req, res) => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['breakfast = toast;Expires = ' + date.toUTCString(), 'dinner = chicken'] // breakfast와 dinner는 하나의 쿠키이다.
    });
    res.end(`<h1>${req.headers.cookie}</h1>`)
}).listen(3000, () => {
    console.log('Server running at 3000 port');
})