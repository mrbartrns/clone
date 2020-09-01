const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hi There, welcome to my assignment!");
});

app.get("/speak/:animal", (req, res) => {
    const sounds = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof!',
        cat: 'I hate you human',
        goldFish: '...'
    }
    const animal = req.params.animal.toLowerCase();
    const sound = sounds[animal];
    res.send(`The ${animal} says: ${sound}`);
    // if(animal === "pig") {
        
    // }
    // else if(animal === "cow") {
    //     res.send("Moo");
    // }
    // else if(animal === "dog") {
    //     res.send("Woof Woof!");
    // }
});

app.get("/repeat/:greeting/:iterates", (req, res) => {
    const greetingType = req.params.greeting;
    const iterator = Number(req.params.iterates);
    let string = '';
    for (let i = 0; i < iterator; i++) {
        string += greetingType + ' ';
    }
    res.send(string);
    // if (greetingType === 'hello') {
    //     let string = "";
    //     for (let i = 0; i < iterator; i++) {
    //         string += 'hello' + ' ';
    //     }
    // }
    // else if (greetingType === 'blah') {
    //     let string = "";
    //     for (let i = 0; i < iterator; i++) {
    //         string += 'blah' + ' ';
    //     }
});

app.get('*', (req, res) => {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, () => {
    console.log("SEVER ON!");
})