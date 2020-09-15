const http = require('http');

http.createServer((req, res) => {
    if (req.headers.cookie) {
        const cookie = req.headers.cookie.split(';').map(el => {
            const element = el.split('=');
            return {
                key: element[0],
                value: element[1]
            }
        });
        console.log(cookie);
    }
}).listen(3000, () => console.log('3000'));