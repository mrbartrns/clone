window.onload = () => {
    const tbody = document.querySelector('tbody');
    const todoForm = document.querySelector('.form-inline');

    function getList() {
        fetch('/list')
            .then(blob => blob.json())
            .then(data => {
                const list = [];
                // const rawList = [...JSON.parse(data).list];
                // const list = [...rawList.filter(data => data.complete === false), ...rawList.filter(data => data.complete === true)];
                // console.log(list);
                list.push(...JSON.parse(data).list);
                // then 안에 넣어 비동기적으로 실행하도록 해야 함.
                const html = [...list.filter(todo => !todo.complete), ...list.filter(todo => todo.complete)]
                            .map((todo, index) => {
                                return `
                                    <tr>
                                    <td data-index="${index}">${index + 1}</td>
                                    <td class="contents ${list[index].complete ? 'complete' : ''}" data-index="${index}">${todo.contents}</td>
                                    <td><button type="button" class="btn btn-success" data-index="${index}">완료</button></td>
                                    <td><button type="button" class="btn btn-danger" data-index="${index}">삭제</button></td>
                                    </tr>
                                `
                            }).join('');
                // const html = list.map((todo, index)=> {
                //     return `
                //         <tr>
                //         <td data-index="${index}">${index + 1}</td>
                //         <td class="contents ${list[index].complete ? 'complete' : ''}" data-index="${index}">${todo.contents}</td>
                //         <td><button type="button" class="btn btn-success" data-index="${index}">완료</button></td>
                //         <td><button type="button" class="btn btn-danger" data-index="${index}">삭제</button></td>
                //         </tr>
                //     `
                // }).join('');

                tbody.innerHTML = html;

                const completeBtns = tbody.querySelectorAll('.btn-success');
                const delBtns = tbody.querySelectorAll('.btn-danger');
                completeBtns.forEach(btn => btn.addEventListener('click', completeTodo));
                delBtns.forEach(btn => btn.addEventListener('click', deleteTodo));
            });
    }

    function submitTodo(e) {
        e.preventDefault();

        const input = document.querySelector('#new_todo');
        const text = input.value;

        // body는 무조건 json으로 보낼 것 > req.body.something이 가능
        fetch('/add', {
            method: 'POST',
            body: JSON.stringify({
                contents: text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => getList());

        console.log(text);

        input.value = "";
    }

    function completeTodo() {
        const index = this.dataset.index;
        const text = document.querySelector(`.contents[data-index="${index}"]`);
        console.log(text);
        text.classList.toggle('complete');
        fetch('/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                index: index
            })
        })
            .then(() => getList());
    }

    function deleteTodo() {
        const index = this.dataset.index;
        fetch('/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    index: index
                })
        }).then(() => getList());
    }

    getList();

    todoForm.addEventListener('submit', submitTodo);

    
}