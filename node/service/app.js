const mysql = require('mysql');

const client = mysql.createConnection({
    user: 'root',
    password: '1234'
});

client.query('USE Company');
client.query('SELECT * FROM Products', (err, res, fields) => {
    if (err) console.log(err);
    console.log(res);
    console.log(fields);
})