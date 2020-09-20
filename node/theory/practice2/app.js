const express = require('express');
const fs = require('fs');
const app = express();
// to use inner javascripts
app.use(express.static(__dirname + '/public'));  

app.get('/', (req, res) => {
    fs.readFile('public/index.html', (err, data) => {
        if(!data) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    })
});

app.listen(3000, console.log(3000));