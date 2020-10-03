const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.post('/test', (req, res) => {
    const text = req.body.value;
    console.log('text:', text);
    res.json(true);
});

app.listen(3000, () => console.log(3000));