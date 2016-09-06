var winston = require('winston');
var fs = require('fs');
var nodemailer = require('nodemailer');
var valdHlpr = require('./validate');
var opts = 'smtps://' + global.email.username + '%40' + global.email.domain + ':' + global.email.password + '@smtp.gmail.com';
var frm = '"' + global.email.name + '" <' + global.email.username + '@' + global.email.domain + '>';
var welcomeEmailHtmlFile = global.email.welcomeEmailHtmlFile;
var resetRequestEmailHtmlFile = global.email.resetRequestEmailHtmlFile;
var resetResponseEmailHtmlFile = global.email.resetResponseEmailHtmlFile;
var verifyResponseEmailHtmlFile = global.email.verifyResponseEmailHtmlFile;
/**
 * [sendMail description]
 *
 * @method sendMail
 *
 * @param  {[type]} to      [description]
 * @param  {[type]} subject [description]
 * @param  {[type]} html    [description]
 *
 * @return {[type]}         [description]
 */
var sendMail = function (options, from, to, subject, html) {
    if (to && valdHlpr.isEmail(to) && subject && html) {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(options || opts);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: from || frm, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                winston.log('error', 'Error sending mail', error);
            }
            winston.log('info', 'Message sent: ', info);
        });
    } else {
        throw new Error('Not enough parameters for sending an email');
    }
};
/**
 * [sendWelcome description]
 *
 * @method sendWelcome
 *
 * @param  {[type]}    usr [description]
 *
 * @return {[type]}        [description]
 */
var sendWelcome = function (usr, tkn) {
    var filename = welcomeEmailHtmlFile;
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            winston.log('error', 'Error sending mail', err);
        } else {
            var html = data.replace('%USERNAME%', usr.usrnm).replace('%NAME%', usr.name || usr.usrnm).replace('%LINK%', global.constants.PROTOCOL + '://' + global.constants.DOMAIN + '/v1/auth/verify?tkn=' + tkn);
            sendMail(null, null, usr.email, 'Welcome to Kiptips, share your tips and keep them', html);
        }
    });
};
/**
 * [sendResetRequest description]
 *
 * @method sendResetRequest
 *
 * @param  {[type]}         usr [description]
 *
 * @return {[type]}             [description]
 */
var sendResetRequest = function (usr, tkn) {
    var filename = resetRequestEmailHtmlFile;
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            winston.log('error', 'Error sending mail', err);
        } else {
            var html = data.replace('%USERNAME%', usr.usrnm).replace('%NAME%', usr.name || usr.usrnm).replace('%LINK%', global.constants.PROTOCOL + '://' + global.constants.DOMAIN + '/v1/auth/reset?tkn=' + tkn);
            sendMail(null, null, usr.email, 'A password reset request has been made', html);
        }
    });
};
/**
 * [sendResetResponse description]
 *
 * @method sendResetResponse
 *
 * @param  {[type]}          usr        [description]
 * @param  {[type]}          new_passwd [description]
 *
 * @return {[type]}                     [description]
 */
var sendResetResponse = function (usr, new_passwd) {
    var filename = resetResponseEmailHtmlFile;
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            winston.log('error', 'Error sending mail', err);
        } else {
            var html = data.replace('%USERNAME%', usr.usrnm).replace('%NAME%', usr.name || usr.usrnm).replace('%PASSWORD%', new_passwd);
            sendMail(null, null, usr.email, 'This is your new log in info', html);
        }
    });
};
/**
 * [sendVerifyResponse description]
 *
 * @method sendVerifyResponse
 *
 * @param  {[type]}           usr [description]
 *
 * @return {[type]}               [description]
 */
var sendVerifyResponse = function (usr) {
    var filename = verifyResponseEmailHtmlFile;
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            winston.log('error', 'Error sending mail', err);
        } else {
            var html = data.replace('%USERNAME%', usr.usrnm).replace('%NAME%', usr.name || usr.usrnm).replace('%PASSWORD%', usr.passwd);
            sendMail(null, null, usr.email, 'Your mail has been verified', html);
        }
    });
};
/**
 * [exports description]
 *
 * @type {Object}
 */
module.exports = {
    sendWelcome: sendWelcome,
    sendResetRequest: sendResetRequest,
    sendResetResponse: sendResetResponse,
    sendVerifyResponse: sendVerifyResponse
};