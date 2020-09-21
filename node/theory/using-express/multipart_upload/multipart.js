const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(multipart({uploadDir: __dirname + '/multipart'}));

app.get('/', (req, res) => {
    fs.readFile('htmlPage.html', (err, data) => {
        if(!data) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    })
});

// app.post('/', (req, res) => {
//     console.log(req.body);
//     // req.files.name으로 들어감 => fieldName 역시 image이지만 filename은 js
//     // headers를 보면 content-javascript로 잡혀 있음
//     console.log(req.files);
//     res.redirect('/');
// })

// rename (사용자가 같은이름으로 파일을 업로드 하면 덮어쓰기가 된다.)
app.post('/', (req, res) => {
    const comment = req.body.comment;
    const imageFile = req.files.image;
    if (imageFile) {
        const name = imageFile.name;
        const path = imageFile.path;
        const type = imageFile.type;
        if (type.indexOf('image') !== -1) {
            const outputPath = __dirname + '/multipart' + Date.now() + '_' + name;
            fs.rename(path, outputPath, err => {
                res.redirect('/');
            })
        } else {
            fs.unlink(path, (err) => {
                res.sendStatus(400);
            })
        }
    } else {
        res.sendStatus(404);
    }
})
/**
 * 특정한 페이지 라우팅시에만 미들웨어 적용:
 * app.post('/', multipart, (req, res) => {
 *      somefunc
 * })
 * '/' 경로에 진입했을 때, multiparty 미들웨어가 먼저 수행된 후, 뒤따라 사용자가 직접 만든 함수가 호출
 */

app.listen(3000, () => console.log(3000));