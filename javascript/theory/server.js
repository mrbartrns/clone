// 웹 서버 생성과 실행
// 모드 추출
const http = require('http');

// 웹 서버 생성
const server = http.createServer();

// server 객체에서 중요한 것은 메서드보다 이벤트이다. server객체는 eventEmitter 객체를 기반으로 만들어졌으므로 이벤트를 연결할 수 있다.
/**
 * request: 클라이언트가 요청할 때 발생하는 이벤트
 * connection: 클라이언트가 접속할 때 발생하는 이벤트
 * close: 서버가 종료될 때 발생하는 이벤트
 * checkContinue: 클라이언트가 지속적인 연결을 하고 있을 때 발생하는 이벤트
 * upgrade: 클라이언트가 업그레으드를 요청할 때 발생하는 이벤트
 * clientError: 클라이언트에서 오류가 발생할 때 발생하는 이벤트
 */

// 웹 서버에 이벤트 연결
server.on('request', (e) => {
    console.log('Request On');
    console.log(e);
});

server.on('connection', () => {
    console.log('Connection On');
});

server.on('close', () => {
    console.log('Close On');
});

// 웹 서버 실행
server.listen(52273, () => console.log('hello'));


// server.on(request)는 다음과 같이 사용될 수 있다.
// server.createServer((req, res) => {
//     res.wrieteHead(200, {
//         'Content-Type': 'text/html'
//     });
//     res.end('<h1>Hello, world...</h1>');
// }).listen(3000);
// 현재까지 웹 브라우저가 요청 메시지를 전달했지만, 웹 서버가 응답메시지를 전송하지 않았으므로 웹 브라우저는 응답을 기다리는 상태가 된다.
// => 웹서버의 응답 메서드 작성 필요