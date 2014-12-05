var express = require('express');
var downloadMapper = require('../source/downloadMapper');
var router = express.Router();

//========================= Download Services =========================//

router.getProfile('/getDownload/:download_id', function(request, response){
    var download_id = request.params.download_id;
    downloadMapper.getDownload(download_id, function(err, data){
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "Download could not be found"
            });
        } else {
            response.send({
                err: "false",
                data: data
            });
        }
    });
});

router.get('/getAllDownloads', function (request, response) {
    downloadMapper.getAllDownloads(function (err, data) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            response.send({
                err: "true",
                data: "No Downloads found"
            });
        } else {
            response.send({
                err: "false",
                data: data
            });
        }
    });
});

router.post('/createDownload', function (request, response) {
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