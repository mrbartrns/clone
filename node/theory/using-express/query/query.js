const express = require('express');

const app = express();

app.use((req, res) => {
    const name = req.query.name; //?name=something&region=somewhere 양식
    const region = req.query.region;
    res.send(`<h1> ${name}, ${region}`);
    console.log(req.query);
});

app.listen(3000, () => console.log(3000));