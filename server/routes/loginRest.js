var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var http = require('http');
var url = require('../../config.json').login_server_url;
var router = express.Router();

router.post('/authenticate', function (req, response) {

    console.log(req.body);

    var credentials = JSON.stringify(req.body);

    request.post({
        headers: {'content-type': 'application/json'},
        url: url,
        timeout: 10000,
        body: credentials
    }, function (err, res, body) {
        if (err) {
            response.statusCode = 401;
            response.send(err);
        }
        if (body == undefined) {
            response.statusCode = 401;
            response.send("error");
        } else {
            body = JSON.parse(body);
        }
        
        if (body.err) {
            response.statusCode = 401;
            response.send(body.err);
        } else {
            // We are sending the profile inside the token
            var token = jwt.sign(body, "secret", {expiresInMinutes: 60 * 5});
            response.statusCode = 200;
            response.json({token: token});
        }
    });
});

module.exports = router;