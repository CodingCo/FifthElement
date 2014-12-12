var http = require('http');

//var login = request.body;

var profile = {
    "username": "JOHN",
    "password": "123"
};


var postOptions = {
    host: 'http://78195575.ngrok.com',
    path: '/login/validateUser',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': profile.length
    }
};

var req = http.request(postOptions, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        console.log(data);
        // We are sending the profile inside the token
        //var token = jwt.sign(profile, "secret", {expiresInMinutes: 60 * 5});
        response.statusCode = 200;
        // response.json({token: token});
    }).on("end", function (data) {
        console.log("ARGH");
    });

});
req.on('error', function () {
   console.log("fucking shit");
});
req.write(JSON.stringify(profile));
req.end();