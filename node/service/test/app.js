const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const intList = [];

app.get('/', (req, res) => {
    for (let i = 0; i < 10; i++) {
        intList.push(i);
        console.log(i);
    }
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});


app.listen(3000, () => console.log(3000));