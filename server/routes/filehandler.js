var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs-extra');

// Show the upload form Included for Testing TO-BE Removed when used in views.
router.get('/', function (req, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var form = '<form action="/filehandler/postFile" enctype="multipart/form-data" method="post">' +
        '<input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
    response.end(form);
});

router.post('/postFile', function (request, response) {

    var form = new formidable.IncomingForm();
    var fileInfo;

    form.parse(request, function (err, fields, files) {
        if (err)response.send({
            err: "true",
            data: "couldn't be saved"
        });
        fileInfo = files;
    });

    form.on('end', function () {

        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;

        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;

        /* Location where we want to copy the uploaded file */
        var new_location = 'public/uploads/' + fileInfo.upload.type + "/";

        //to make sure no conflicting file names
        var unique = new Date().getTime();

        //final path to uploaded file
        var path = new_location + unique + "_" + file_name;

        //path to return
        var userPath = "uploads/" + fileInfo.upload.type + "/" + unique + "_" + file_name;

        fs.move(temp_path, path, function (err) {
            if (err)  response.send({
                err: "true",
                data: "file not uploaded"
            });
            else {
                response.send({
                    err: "false",
                    data: userPath
                });
            }
        });
    });
});

module.exports = router;