var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.redirect('home.html');
});

router.get('/fileuploader', function (req, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var form = '<form action="/filehandler/postFile" enctype="multipart/form-data" method="post">' +
        '<input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
    response.end(form);
});

module.exports = router;
