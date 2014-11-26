var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var expressJwt = require('express-jwt');

var app = express();

//We can skip Authentication from our Unit Tests, but NEVER in production
if (process.env.NODE_ENV || typeof global.SKIP_AUTHENTICATION == "undefined") {
// Protected Routes (via /api routes with JWT)
    app.use('/users', expressJwt({secret: require("./security/tokens").secretTokenUser}));
    //app.use('/adminApi', expressJwt({secret: require("./security/secrets").secretTokenAdmin}));
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /client
//app.use(favicon(__dirname + '/client/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/SPA')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
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
