const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    fs.readFile('ex1.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(data);
    })
});

// express로 작업할 시 요청 url을 지정해줘야 함!
app.get('/dataGet',(req, res) => {
    console.log('요청을 받았습니다.');
    fs.readFile('ex2.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
    });
});

app.listen(3000, () => console.log(3000));