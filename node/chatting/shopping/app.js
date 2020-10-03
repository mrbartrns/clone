const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const ejs = require('ejs');
const fs = require('fs');

// 생성자 선언
let counter = 0;
function Product(name, image, price, count) {
    // count: 갯수
    this.index = counter++;
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
}

// 변수 생성. Product의 index와 products list의 index는 동일함
const products = [
    new Product('Javascript', 'chrome.png', 28000, 30),
    new Product('jQuery', 'chrome.png', 28000, 30),
    new Product('Node.js', 'chrome.png', 32000, 30),
    new Product('Socket.io', 'chrome.png', 17000, 30),
    new Product('Connect', 'chrome.png', 18000, 30),
    new Product('Express', 'chrome.png', 31000, 30),
    new Product('Ejs', 'chrome.png', 12000, 30),
]

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    fs.readFile('vanillaHTMLPage.ejs', 'utf8', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(ejs.render(data, {products: products}));
    });
});


server.listen(3000, () => console.log('server listening at port 3000'));

const io = socketio.listen(server);

io.on('connection', socket => {
    // events, method.. > cart, buy, return events
    // cart event는 물건을 카트에 담을때 발생하는 이벤트이다.

    // 물건 구매를 취소하거나 타이머가 작동할 때 실행할 함수
    function onReturn(index) {
        /**
         * index: index of products
         * count를 다시 원래대로 복구해야 함
         * 설정했던 timeout을 초기화
         * 카트에 담아놨던 물건을 제거
         */
        products[index].count++;
        clearTimeout(cart[index].timerID); //?
        delete cart[index];
        // count event를 실행, 바뀐 정보를 갱신시킴 서버에 저장된 정보를 클라이언트로 전달
        io.emit('count', {
            index: index, // 어떤 항목을 뺐는지
            count: products[index].count // 변화한 수량
        });

    }

    let cart = {};

    // on event 후 정보를 전달하기 위해서는 event를 emit해야 한다.
    socket.on('cart', (index) => {
        products[index].count--; // 카탈로그의 수량을 감소시킨다.
        
        cart[index] = {};
        cart[index].index = index;
        cart[index].timerID = setTimeout(() => onReturn(index), 60 * 10 * 1000);
        // cart = {
        //     1: {
        //         index: index,
        //         timerID: setTimeout..
        //     },...
        // }
        console.log(cart);
        io.emit('count', {
            index: index,
            count: products[index].count
        })
    });
    socket.on('buy', (index) => {
        // 담은 후에만 물건을 살 수 있으므로 count는 이미 처리된 상태이다.

        clearTimeout(cart[index].timerID);

        delete cart[index];

        console.log(cart);

        io.emit('count', {
            index: index,
            count: products[index].count
        });

    });
    socket.on('return', (index) => {
        // emit 시 index를 받고, index로 onReturn 함수를 실행한다.
        onReturn(index);
    });
});