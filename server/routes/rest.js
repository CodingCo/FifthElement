var express = require('express');
var mapper = require('../source/documentMapper');
var router = express.Router();


router.get('/getAllDocuments', function (request, response) {
    mapper.getAllDocuments(function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
            response.send("{}");
        }
        response.send(data);
    })
});

router.get('/getDocument/:doc_id', function (request, response) {
    var doc_id = request.params.doc_id;
    mapper.getDocument(doc_id, function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
            response.send("{}");
        }
        response.send(data);
    });
});

router.post('/createDocument', function (request, response) {
    var document = request.body;
    mapper.createDocument(document, function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
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

router.put('/editDocument', function (request, response) {
    var document = request.body;
    mapper.editDocument(document, function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
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

router.delete('/deleteDocument/:doc_id', function (request, response) {
    var doc_id = request.params.doc_id;
    mapper.deleteDocument(doc_id, function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
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