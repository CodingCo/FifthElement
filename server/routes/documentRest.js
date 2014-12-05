var express = require('express');
var documentMapper = require('../source/documentMapper');
var router = express.Router();

//========================= Document Services =========================//

router.get('/getAllDocuments', function (request, response) {
    documentMapper.getAllDocuments(function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.setHeader('Content-Type', 'application/json');
            response.send("{}");
        }
        response.send(data);
    })
});

router.get('/getDocument/:doc_id', function (request, response) {
    var doc_id = request.params.doc_id;
    document.getDocument(doc_id, function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send("{}");
        }
        response.send(data);
    });
});

router.post('/createDocument', function (request, response) {
    var document = request.body;
    documentMapper.createDocument(document, function (err, data) {
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

router.put('/editDocument', function (request, response) {
    var document = request.body;
    documentMapper.editDocument(document, function (err, data) {
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

router.delete('/deleteDocument/:doc_id', function (request, response) {
    var doc_id = request.params.doc_id;
    documentMapper.deleteDocument(doc_id, function (err, data) {
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