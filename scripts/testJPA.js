var request = require('request');

var profile = {
    "username": "test9",
    "password": "samsø"
};

request.post({
    headers: {'content-type' : 'application/json'},
    url:     'http://78195575.ngrok.com/login/validateUser',
    body:    "{'username':'test9','password':'samsø'}"
}, function(err, res, body){
    if(err) {
        console.log(err);
    }
    console.log(body);
});