var express = require('express');
var downloadMapper = require('../source/downloadMapper');
var router = express.Router();

//========================= Download Services =========================//

router.get('/getDownload/:download_id', function (request, response) {
    var download_id = request.params.download_id;
    downloadMapper.getDownload(download_id, function (err, data) {
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



module.exports = router;