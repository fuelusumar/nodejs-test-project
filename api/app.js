var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var constants = require('./config/initializers/constants');
var security = require('./config/initializers/security');
var database = require('./config/initializers/database');
var email = require('./config/initializers/email');
var endpoints = require('./config/initializers/endpoints');
var routes = require('./routes');
// init express
var app = express();
// compress all requests
app.use(compress({
    level: 9
}));
if (app.get('env') === 'development' || app.get('env') === 'testing') {
    app.use(logger('dev'));
} else {
    app.use(logger('short'));
}
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({
    limit: '16mb'
}));
app.use(bodyParser.urlencoded({
    limit: '16mb',
    extended: false
}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: false
//}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public', 'doc')));
app.use(express.static(path.join(__dirname, 'public', 'email')));
//app.use(express.static(path.join(__dirname, 'public', 'img')));
//
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type');
    next();
});
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err.message);
        console.log(err.stack);
        res.status(err.status || 500).send({
            error: err.message,
            stack: err.stack
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err.message);
    console.log(err.stack);
    res.status(err.status || 500).send({
        error: err.message
    });
});
module.exports = app;