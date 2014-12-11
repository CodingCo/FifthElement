var express = require('express');
var profileMapper = require('../source/profileMapper');
var router = express.Router();

//========================= Profile Services =========================//

router.get('/getProfile/:email', function(request, response){
    var email = request.params.email;
    profileMapper.getDocument(email, function(err, data){
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "Profile could not be found"
            });
        } else {
            response.send({
                err: "false",
                data: data
            });
        }
    });
});

router.get('/getAllProfiles', function (request, response) {
    profileMapper.getAllProfiles(function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "No Profiles found"
            });
        } else {
            response.send({
                err: "false",
                data: data
            });
        }
    });
});



module.exports = router;