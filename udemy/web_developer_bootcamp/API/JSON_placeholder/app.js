const express = require('express');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.get("/results", (req, res) => {
    request("http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb", (error, response, body) => {
        if(!error && response.statusCode === 200) {
            const parsed = JSON.parse(body);
            // res.send(parsed['Search'][0]);
            res.render("results", {data: parsed});
        }
    });

});

app.listen(3000, () => {
    console.log('hi');
});