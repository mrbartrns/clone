const express = require('express');
const app = express();
// const app = require('express')();

app.get('/', (req, res) => {
    res.render("home.ejs");
})

app.get('/fallinlovewith/:dog', (req, res) => {
    const dogVar = req.params.dog;
    res.render("love.ejs", {dogVar: dogVar});
})

app.listen(3000, () => {
    console.log('SERVER ON!');
})