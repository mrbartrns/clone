// 1.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
// 2.렌더링 할 파일의 확장자를 선택한다.
app.set('view engine', 'ejs');

let friends = ['Tony', 'Miranda', 'Justin', 'Pierre', 'Cloe'];

//4. get root 설정
app.get('/', (req, res) => {
    res.render('home');
});

app.post("/addfriend", (req, res) => {
    const newFriend = req.body.newfriend;
    friends.push(newFriend);
    // res.send('YOU HAVE REACHED THE POST ROUTE!');
    res.redirect('/friends');
});

app.get('/friends', (req, res) => {
    res.render('friends', {friends: friends});
});

// 3.
app.listen(3000, () => {
    console.log("Let's get Started.")
});