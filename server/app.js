var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rest = require('./routes/rest');
var cms = require('./routes/cms');
var qt = require('quickthumb');
var fileHandler = require('./routes/filehandler');
var connection = require('./model/connection');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/SPA')));

app.use('/', cms);
app.use('/api', rest);
app.use('/cms', cms);
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
