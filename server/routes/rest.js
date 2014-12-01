var express = require('express');
var mapper = require('../source/documentMapper');
var router = express.Router();


router.get('/getDoc/:title', function (request, response) {
    var title = request.params.title;
    mapper.getDocument(title, function (err, data) {
        if (err) response.send(err);
        response.setHeader('Content-Type', 'application/json');
        response.send(data);
    });
});

router.get('/getDocs/:searchString', function (request, response) {
    var searchString = request.params.searchString;
    mapper.getDocuments(searchString, function (err, data) {
        if (err) response.send("not found");
        response.send(data);
    });
});

router.delete('/deleteDoc/:title', function (request, response) {
    var title = request.params.title;
    mapper.deleteDocument(title, function (err, data) {
        if (err) response.send(err);
        response.send(data);
    });
});


router.get('/saveDoc/:document', function (request, response) {
    var document = request.params.document;
    mapper.postDocument(document, function (err, data) {
        if (err) response.send("not found");
        response.send(data);
    });
});


module.exports = router;