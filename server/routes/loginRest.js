var express = require('express');
var jwt = require('jsonwebtoken');
var http = require('http');
var router = express.Router();


router.post('/authenticate', function (request, response) {
    var login = request.body;

    var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, "secret", {expiresInMinutes: 60 * 5});
    response.json({token: token});
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