const express = require('express');
const app = express();
// const app = require('express')();

app.use(express.static("public"));
app.set('view engine', 'ejs'); // render에 ejs를 굳이 쓸 필요가 없다.

app.get('/', (req, res) => {
    res.render("home");
})

app.get('/fallinlovewith/:dog', (req, res) => {
    const dogVar = req.params.dog;
    res.render("love", {dogVar: dogVar});
})

app.get('/posts', (req, res) => {
    const posts = [
        {
            title: 'post 1', author: 'Susy'
        },
        {
            title: 'My adorable pet bunny', author: 'Charlie'
        },
        {
            title: 'Can you believe this pomsky?', author: 'Colt'
        }
    ];
    res.render('posts', {posts: posts});
})

app.listen(3000, () => {
    console.log('SERVER ON!');
})