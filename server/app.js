var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var documentRest = require('./routes/documentRest');
var profileRest = require('./routes/profileRest');
var downloadRest = require('./routes/downloadRest');
var cmsRest = require('./routes/cmsRest');
var expressJwt = require('express-jwt');
var home = require('./routes/home');
var qt = require('quickthumb');
var fileHandler = require('./routes/filehandler');
var connection = require('./model/connection');
var authenticate = require('./routes/loginRest');
var app = express();

if (app.get('env') === 'production') {
    console.log("Mode: " + app.get('env'));
    connection.connect(undefined, "production");
} else {
    connection.connect();
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use('/cms', expressJwt({secret: "secret"}));
app.use('/filehandler', expressJwt({secret: "secret"}));
app.use(favicon(__dirname + '../../public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/SPA')));

app.use('/', home);
app.use('/uri', authenticate);
app.use('/api', documentRest);
app.use('/api', profileRest);
app.use('/api', downloadRest);
app.use('/cms', cmsRest);
app.use('/filehandler', fileHandler);
app.use(qt.static(__dirname + '/../public/'));

// Error handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    console.log("Mode: " + app.get('env'));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
