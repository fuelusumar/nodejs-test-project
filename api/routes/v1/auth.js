var express = require('express');
var router = express.Router();
var resHlpr = require('../../helpers/response');
var authCtrl = require('../../controllers/auth');
var authHlpr = require('../../helpers/auth');
var expressJWT = require('express-jwt');
/**
 * @api {post} /v1/auth/login log in as an user
 * @apiVersion 0.0.1
 * @apiName login
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {Object} body login object to be created
 * @apiParam {String} body.usrnm users username or email
 * @apiParam {String} body.passwd users password
 * @apiParam {String} body.device users device unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data created user object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.post('/auth/login', function (req, res, next) {
    try {
        authCtrl.login(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'auth',
                action: 'login'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {post} /v1/auth/signup sign up and create an user
 * @apiVersion 0.0.1
 * @apiName signup
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {Object} body user object to be created
 * @apiParam {String} body.usrnm users username
 * @apiParam {String} body.passwd users password
 * @apiParam {String} body.email users email
 * @apiParam {String} body.device users device unique id
 *
 * @apiSuccess (Success 201) {String} action indicates done action
 * @apiSuccess (Success 201) {Object} data created user object
 * @apiSuccess (Success 201) {Object[]} links hypermedia
 * @apiSuccess (Success 201) {String} auth authorization token
 */
router.post('/auth/signup', function (req, res, next) {
    try {
        authCtrl.signup(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'auth',
                action: 'signup'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {post} /v1/auth/logout log out and delete tokens
 * @apiVersion 0.0.1
 * @apiName logout
 * @apiGroup auth
 * @apiPermission user has to have a token
 *
 * @apiParam {Object} body info object to process
 * @apiParam {String} body.device users device to logout from
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.post('/auth/logout', expressJWT(global.security.options), authHlpr.renewToken, function (req, res, next) {
    try {
        req.body._usr = req._id;
        authCtrl.logout(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'auth',
                action: 'logout'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {post} /v1/auth/forgot sends reset password link to users email
 * @apiVersion 0.0.1
 * @apiName forgot
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {Object} body forgot object to be created
 * @apiParam {String} body.email users email
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.post('/auth/forgot', function (req, res, next) {
    try {
        authCtrl.forgot(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'auth',
                action: 'forgot'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {get} /v1/auth/reset resets password and send it to email
 * @apiVersion 0.0.1
 * @apiName reset
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {String} token token to reset password
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.get('/auth/reset', function (req, res, next) {
    try {
        authCtrl.reset(req.query, function (error, result, status) {
            resHlpr.redirect(error, status, 'http://kiptips.com/password.html', res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {get} /v1/auth/verify resets password and send it to email
 * @apiVersion 0.0.1
 * @apiName verify
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {String} token token to verify email
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.get('/auth/verify', function (req, res, next) {
    try {
        authCtrl.verify(req.query, function (error, result, status) {
            resHlpr.redirect(error, status, 'http://kiptips.com/email.html', res, next);
        });
    } catch (err) {
        next(err);
    }
});
//
module.exports = router;