/*
What is a framework? How is it different from a library?
> inversion of control
프레임워크는 뼈대나 기반구조를 뜻하고, 제어의 역전 개념이 적용된 대표적인 기술
클래스와 인터페이스의 집합, 프로그래머가 완성시켜야 함
- 특정 개념들의 추상화를 제공하는 여러 클래스나 컴포넌트로 구성
- 높은 수준에서 패턴 조작화 가능
라이브러리는 단순 활용가능한 도구들의 집합
- 개발자가 만든 클래스에서 호출하여 사용
차이점:
라이브러리: 그냥 함수들이나 기능 모음을 가져다가 쓰는 것
프레임워크: 특정 디자인 패턴이나, 전처리 후처리에 필요한 동작과 기능들을 수행하기 위해서 프레임워크가 실행되다가 중간 중간에 특정 비지니스나, 특정 구현 단에서만 사용자의 코드를 lookup(검색)하여 사용하는 형태라고 할 수 있음
> framework 
Why are we using Express?
*/
// 브라우저에서 Request가 왔을 때 서버에서 어떤 작업을 할 지 Router를 통해서 설정
// 즉 라우터는 특정한 요청을 듣고 요청에 따라 다른 코드를 실행한다
// make app require express
// listening for the request(get)
// listening for the request(post)
const express = require("express");
const app = express();

// ROUTES:
// "/" => 'Hi there!'
// two different parameters (url of the path which is slash, call back function(request(object, information about the request that was made that triggered this rout), response))
app.get("/", (req, res) => {
    res.send('hi!');
});

// "/bye" => "Goodbye!"
app.get("/bye", (req, res) => {
    res.send('bye!');
});
// "/dog" => "MEOW!"
app.get("/dog", (req, res) => {
    console.log("some one made a request to /dog");
    res.send("MEOW!");
});

app.get("/r/:subredditName/", (req, res) => {
    const subreddit = req.params.subredditName;
    console.log(req.params);
    res.send(`WELCOME TO THE ${subreddit.toUpperCase()} SUBREDDIT`);
});

app.get("/r/:subbredtName/comments/:id/:title", (req, res) => {
    res.send("WELCOME TO COMMENTS PAGE!");
});

// if I order first, all hompages will be sended you are a star
app.get("*", (req, res) => {
    res.send("YOR ARE A STAR!");
});


// app.get("/r/:subredditName/comments/id/title/")

// this is path variables
// Tell Express to listen for requests (start server)
app.listen(3000, () => {
    console.log("Server has started");
});
// any time I change something, I have to restart server