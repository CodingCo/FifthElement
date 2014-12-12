var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var http = require('http');
var router = express.Router();

router.post('/authenticate', function (req, response) {

    console.log(req.body);

    var credentials = JSON.stringify(req.body);

    request.post({
        headers: {'content-type' : 'application/json'},
        url:     'http://78195575.ngrok.com/login/validateUser',
        timeout: 10000,
        body:    credentials
    }, function(err, res, body){
        if(err) {
            response.statusCode = 401;
            response.send(err);
        }
        console.log(body);
        body = JSON.parse(body);

        if(body.err){
            response.statusCode = 401;
            response.send(body.err);
        }else {
            // We are sending the profile inside the token
            var token = jwt.sign(body, "secret", {expiresInMinutes: 60 * 5});
            response.statusCode = 200;
            response.json({token: token});
        }
    });
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