// File System Module을 이용한 HTML 페이지 제공
/**
 * HTML 페이지를 클라이언트에 제공하려면 먼저 서버가 필요 => 서버 작성하기
 * 사용자에게 html 파일을 제공하기 위해 File System module 필요
 * request event가 발생할 때 마다 readFile()을 이용해 html page render
 */
/**
 * 1. http module 불러오기
 * 2. file system module 불러오기
 * 3. 서버 생성하기
 * 4. 서버를 생성후 request event 발생시, readFile함수를 실행하여 data를 가져옴
 * 5. 가져온 데이터를 응답시킴
 */
 const http = require('http');
 const fs = require('fs');
 const routes = 3000;
 // if request, then response (promise-like)
 const server = http.createServer((request, response) => {
     console.log(request);
     // read html file
     fs.readFile('HTMLpage.html', (err, data) => {
         if (!data) {console.log(err)}
         response.writeHead(200, {'Content-Type': 'text/html'});
         response.end(data);
     });
 }).listen(3000, () => {
     console.log(`Server running at http://localhost:${routes}`);
 });