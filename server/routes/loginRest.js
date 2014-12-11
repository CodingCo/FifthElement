var express = require('express');
var router = express.Router();
var http = require('http');

router.post('/authenticate', function (request, response) {
    var login = request.body;
    console.log(login);
    console.log("jkldfsklsdfdsfkldsfkljdsfkjl");
    var options = {
        host: 'localhost', //indsæt ip her
        port: 80,
        path: '/validateuser',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': login.length
        }
    };

    var req = http.request(options, function (response) {
        if (err) {
            response.send({
                data: "Login error"
            });
        } else {
            response.send({
                data: data
            });
        }
    });

    response.send();
});

router.post('/usercreate', function (request, response) {
    var user = request.body;
    var options = {
        host: 'localhost', //indsæt ip her
        port: 80,
        path: '/createuser',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': user.length
        }
    };

    var req = http.request(options, function (response) {
        if (err) {
            response.send({
                data: "Create user error"
            });
        } else {
            response.send({
                data: data
            });
        }
    });

    response.send();
});

module.exports = router;