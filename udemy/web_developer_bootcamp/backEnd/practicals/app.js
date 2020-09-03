const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('demo');
})

app.listen(3000, () => {
    console.log('server has been started!');
})