var express = require('express');
var mapper = require('../source/documentMapper');
var colors = require('colors');
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

// mapper method missing
router.post('createDocument', function (request, response) {
    var document = request.body;
    mapper.createDocument(document, function (err, data) {c
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


module.exports = router;