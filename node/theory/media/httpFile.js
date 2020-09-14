// 이미지와 음악 파일 제공
// Content-Type 관련된 내용을 통해 여러 종류의 파일 제공이 가능

const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    // 52273 port는 이미자 파일 담당
    fs.readFile('./media/sunyu-kim-seoul.jpg', (err, data) => {
        if(!data) {console.log(err)}
        else {
            console.log('done!');
            response.writeHead(200, {'Content-Type': 'image/jpeg'});
            response.end(data);
        }
    });

}).listen(52273, () => {
    console.log('Server Running at port 52273');
});

http.createServer((request, response) => {
    fs.readFile('./media/snare.wav', (err, data) => {
        response.writeHead(200, {'Content-Type': 'audio/wav'});
        response.end(data);
    })
}).listen(52274, () => {
    console.log('Server Running at port 52274');
});