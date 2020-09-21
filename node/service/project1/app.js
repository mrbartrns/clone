const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

// this is database
const dummyDB = (function() {
    const dummyDB = {};
    const storage = [];
    let count = 1;

    // method
    dummyDB.get = function(id) {
        if (id) {
            id = typeof(id) === 'string' ? Number(id) : id;
            for (let i in storage) if (storage[i].id === id) {
                return storage[i];
            }
        } else {
            return storage;
        }
    };

    dummyDB.insert = function(data) {
        data.id = count++;
        storage.push(data);
        return data;
    };

    dummyDB.remove = function(id) {
        id = typeof(id) === 'string' ? Number(id) : id;

        for (let i in storage) if (storage[i].id === id) {
            storage.splice(i, 1);
            return true;
        }
        return false;
    }

    return dummyDB;
})();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// 모든 데이터 요청
app.get('/user', (req, res) => {
    res.json(dummyDB.get());
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.json(dummyDB.get(id));
    console.log(dummyDB.get(id));
});

app.post('/user', (req, res) => {
    const name = req.body.name;
    const region = req.body.region;
    // 유효성 검사
    if (name && region) {
        res.send(dummyDB.insert({
            name: name,
            region: region
        }));
    } else {
        throw new Error('error');
    }
});

// put요청은 요청된 자원을 수정한다. 내용 갱신을 위주로 location:uri를 보내지 않아도 된다. 클라이언트측은 요청된 uri를 그대로 사용하는 것으로 간주
app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const region = req.body.region;

    const item = dummyDB.get(id);
    item.name = name || item.name;
    item.region = region || item.region;
    
    res.json(item);
});

// 요청된 자원을 삭제할 것을 요청 (대부분의 서버에서 비활성)
app.delete('/user/:id', (req, res) => {
    res.send(dummyDB.remove(req.params.id));
});

app.listen(3000, () => console.log(3000));