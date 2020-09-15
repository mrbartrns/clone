// create server and render using file system
// when make head, set cookie Expire
// make media server to get media
// change the route whenever get special request

// import module
const http = require('http');
const fs = require('fs');
const url = require('url');

function render(res, fileName, date) {
    fs.readFile(fileName,(err, data) => {
        if (!data) {console.log(err)}
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['hi = name;Expires = ' + date.toUTCString()] // 첫번째 키워드는 무조건 key: value임
        });
        res.end(data);
    });   
}

http.createServer((req, res) => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const pathName = url.parse(req.url).pathname; //req객체의 url을 parsing하여 새로운 url 객체로 만듬, 그 안에서 pathname
    if (pathName === '/') {
        render(res, './practice1/p1.html', date);
    }
    else if (pathName === '/clown') {
        render(res, './practice1/p2.html', date);
    }
}).listen(3000, () => {
    console.log('this is text/html server');
});

http.createServer((req, res) => {
    fs.readFile('./media/sunyu-kim-seoul.jpg', (err, data) => {
        if (!data) {console.log(err)}
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    })
}).listen(3001, () => {
    console.log('this is img server');
});

http.createServer((req, res) => {
    fs.readFile('./media/snare.wav', (err, data) => {
        if (!data) {console.log(err)}
        res.writeHead(200, {'Content-Type': 'audio/wav'});
        res.end(data);
    })
}).listen(3002, () => {
    console.log('this is sound server');
})