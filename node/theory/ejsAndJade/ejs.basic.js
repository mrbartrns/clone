// ejs module을 이용한 동적 웹페이지 구현
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// http.createServer((req, res) => {
//     fs.readFile('ejsPage.ejs', 'utf8', (err, data) => {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(ejs.render(data));
//     });
// }).listen(3000, () => console.log(3000));

// ejs페이지에 데이터를 전달하기위해 render method의 두번째 매개변수에 전달하고자 하는 데이터 입력
http.createServer((req, res) => {
    fs.readFile('ejsPage.ejs', 'utf8', (err, data) => { // utf8이 빠지면 오류발생
        if (!data) {console.log(err)}
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(ejs.render(data, {
            name: 'RinIanTta',
            description: 'Hello ejs with node js'
        }));
    });
}).listen(3000, () => console.log(3000));