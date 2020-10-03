const { json } = require('express');
const fs = require('fs');
const LISTJSON = './todo_list.json';

// route 요청할 경우 route에서 필요한 파일들을 가져온다. app에서 실행하는 것이 아님
// list 함수는 json file로부터 리스트를 불러온다.
exports.list = (req, res) => {
    fs.readFile(LISTJSON, 'utf8', (error, jsonlist) => {
        if(jsonlist) {
            if (error) throw error;
            res.json(jsonlist);
        } else {
            // json으로 저장시킬 것
            const list = {
                list: []
            }
            fs.writeFile(LISTJSON, JSON.stringify(list), (err) => {
                res.json(list);
            })
        }
    })
}

// add 함수는 새로운 ToDo 항목을 추가한다.
exports.add = (req, res) => {
    const todo = {
        contents: '',
        complete: false
    };

    todo.contents = req.body.contents;
    console.log(todo.contents);

    fs.readFile(LISTJSON, 'utf8', (error, data) => {
        data = JSON.parse(data);
        data['list'].push(todo);

        fs.writeFile(LISTJSON, JSON.stringify(data), (err) => {
            res.json(true);
        });
    });
}

exports.complete = (req, res) => {
    fs.readFile(LISTJSON, 'utf8', (error, data) => {
        data = JSON.parse(data);
        const index = Number(req.body.index);
        data['list'][index].complete = !data['list'][index].complete;
        
        fs.writeFile(LISTJSON, JSON.stringify(data), (err) => {
            res.json(true);
        });
    });
};

exports.del = (req, res) => {
    const index = Number(req.body.index);
    fs.readFile(LISTJSON, 'utf8', (error, data) => {
        data = JSON.parse(data);
        data.list[index] = null;
        data.list = data.list.filter(Boolean);

        fs.writeFile(LISTJSON, JSON.stringify(data), () => res.json(true));
    });
}