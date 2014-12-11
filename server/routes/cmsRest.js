var express = require('express');
var documentMapper = require('../source/documentMapper');
var profileMapper = require('../source/profileMapper');
var downloadMapper = require('../source/downloadMapper');
var router = express.Router();

router.post('/createDocument', function (request, response) {
    var document = request.body;
    documentMapper.createDocument(document, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: true,
                data: "Could not be saved"
            });
        } else {
            response.send({
                err: false,
                data: data
            });
        }
    });
});

router.put('/editDocument', function (request, response) {
    var document = request.body;
    documentMapper.editDocument(document, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: true,
                data: "Could not be updated"
            });
        } else {
            response.send({
                err: false,
                data: data
            });
        }
    });
});

router.delete('/deleteDocument/:doc_id', function (request, response) {
    var doc_id = request.params.doc_id;
    documentMapper.deleteDocument(doc_id, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: true,
                data: "Could not be deleted"
            });
        } else {
            response.send({
                err: false,
                data: data
            });
        }
    });
});


//=========================download==========================//

router.post('/createDownload', function (request, response) {
    console.log("JDKSLFJHDSKLJFKLDJFKLDSJFSDKLJFKDLSJFDKSLFJDS");
    downloadMapper.createDownload(request.body, function (err, data) {
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

router.put('/editDownload', function (request, response) {
    downloadMapper.editDownload(request.body, function (err, data) {
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

router.delete('/deleteDownload/:download_id', function (request, response) {
    var download_id = request.params.download_id;
    downloadMapper.deleteDownload(download_id, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: true,
                data: "Could not be deleted"
            });
        } else {
            response.send({
                err: false,
                data: data
            });
        }
    });
});

//=============Profiles==================//
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

