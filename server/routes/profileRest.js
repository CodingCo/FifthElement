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

router.post('/createProfile', function (request, response) {
    profileMapper.createProfile(request.body, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "Could not be saved"
            });
        } else {
            response.send({
                err: "false",
                data: data
            });
        }
    });
});

router.put('/editProfile', function (request, response) {
    documentMapper.editDocument(request.body, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "Could not be updated"
            });
        } else {
            response.send({
                err: "false",
                data: data
            });
        }
    });
});

router.delete('/deleteProfile/:email', function (request, response) {
    var email = request.params.email;
    profileMapper.deleteProfile(email, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "Could not be deleted"
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