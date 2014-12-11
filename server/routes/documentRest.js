var express = require('express');
var documentMapper = require('../source/documentMapper');
var router = express.Router();


router.get('/getAllDocuments', function (request, response) {
    documentMapper.getAllDocuments(function (err, data) {
        if (err) {
            response.send(err);
        }
        response.send(data);
    })
});

router.get('/getDocument/:doc_id', function (request, response) {
    var doc_id = request.params.doc_id;
    documentMapper.getDocument(doc_id, function (err, data) {
        if (err) {
            response.send("{}");
        }
        response.send(data);
    });
});

router.get('/getPinnedDocuments', function (request, response) {
    documentMapper.getPinnedDocuments(function (err, data) {
        if (err) {
            response.send("{}");
        }
        response.send(data);
    });
});


module.exports = router;