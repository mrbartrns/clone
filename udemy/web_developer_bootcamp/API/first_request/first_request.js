const request = require('request');
request('http://www.reddit.com',(error, response, body) => {
    if(error) {
        console.log("Something went wrong!");
        console.log(error);
    } else {
        if (response.statusCode === 200) {
            console.log(body);
        }
    }
})