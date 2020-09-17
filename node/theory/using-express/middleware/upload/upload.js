const express = require('express');
const fs = require('fs');
const multipart = require('connect-multiparty');

const app = express();

app.use(multipart({ uploadDir: __dirname + '/multipart'}));

app.get('/', (req, res) => {
    fs.readFile('upload.html', (err, data) => {
        if (!data) {console.log(err)}
        res.send(data.toString());
    });
});

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.files);
});

app.listen(3000, () => console.log(3000));