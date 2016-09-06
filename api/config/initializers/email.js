var winston = require('winston');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var environment = process.env.NODE_ENV || 'development';
var email = require('../environments/' + environment + '/email.json');
/**
 * [initConstants description]
 *
 * @method initConstants
 *
 * @return {[type]}      [description]
 */
var initConstants = function () {
    winston.log('info', 'Initialazing email...');
    global.email = email;
    var splitted = __dirname.split('/');
    splitted.pop();
    splitted.pop();
    global.email.welcomeEmailHtmlFile = splitted.join('/') + '/' + 'public/email/email_welcome.html';
    global.email.resetRequestEmailHtmlFile = splitted.join('/') + '/' + 'public/email/email_password.html';
    global.email.resetResponseEmailHtmlFile = splitted.join('/') + '/' + 'public/email/email_password_noti.html';
    global.email.verifyResponseEmailHtmlFile = splitted.join('/') + '/' + 'public/email/email_verified.html';
};
// action to take when events are emitted
eventEmitter.on('initConstants', initConstants);
// events emision
eventEmitter.emit('initConstants');
process.on('uncaughtException', function (err) {
    winston.log('error', 'Error initialazing email', err);
});