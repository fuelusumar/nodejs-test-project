var express = require('express');
var router = express.Router();
var resHlpr = require('../../helpers/response');
var authHlpr = require('../../helpers/auth');
var usrCtrl = require('../../controllers/user');
var expressJWT = require('express-jwt');
/**
 * JWT middleware
 */
router.use(expressJWT(global.security.options));
router.use(authHlpr.renewToken);
/**
 * @api {put} /v1/users/:user_id update an user
 * @apiVersion 0.0.1
 * @apiName updateUsr
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Object} body user object to be updated
 * @apiParam {String} body.usrnm users username
 * @apiParam {String} body.old_passwd users password
 * @apiParam {String} body.new_passwd users password
 * @apiParam {String} body.email users email
 * @apiParam {String} body.name users name
 * @apiParam {String} body.img base64 encoded image
 * @apiParam {String} body.avatar_url external url or no_avatar
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data user object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.put('/users/:user_id', function (req, res, next) {
	try {
		if (req._id == req.params.user_id) {
			req.body._id = req.params.user_id;
			usrCtrl.updateOrPatchUsr(req.body, function (error, result, status) {
				resHlpr.send(error, result, status, {
					version: 'v1',
					controller: 'users',
					action: 'update'
				}, req, res, next);
			});
		} else {
			throw new Error('Unauthorized to change user info');
		}
	} catch (err) {
		next(err);
	}
});
/**
 * @api {patch} /v1/users/:user_id partially update an user
 * @apiVersion 0.0.1
 * @apiName patchUsr
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Object} body user object to be updated
 * @apiParam {String} body.usrnm users username
 * @apiParam {String} body.old_passwd users password
 * @apiParam {String} body.new_passwd users password
 * @apiParam {String} body.email users email
 * @apiParam {String} body.name users name
 * @apiParam {String} body.img base64 encoded image
 * @apiParam {String} body.avatar_url external url or no_avatar
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data user object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.patch('/users/:user_id', function (req, res, next) {
	try {
		if (req._id == req.params.user_id) {
			req.body._id = req.params.user_id;
			usrCtrl.updateOrPatchUsr(req.body, function (error, result, status) {
				resHlpr.send(error, result, status, {
					version: 'v1',
					controller: 'users',
					action: 'partial'
				}, req, res, next);
			});
		} else {
			throw new Error('Unauthorized to change user info');
		}
	} catch (err) {
		next(err);
	}
});
/**
 * @api {delete} /v1/users/:user_id delete an user
 * @apiVersion 0.0.1
 * @apiName deleteUsrById
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.delete('/users/:user_id', function (req, res, next) {
	try {
		if (req._id == req.params.user_id) {
			usrCtrl.deleteUsrById(req.params.user_id, function (error, result, status) {
				resHlpr.send(error, result, status, {
					version: 'v1',
					controller: 'users',
					action: 'delete'
				}, req, res, next);
			});
		} else {
			throw new Error('Unauthorized to delete user info');
		}
	} catch (err) {
		next(err);
	}
});
/**
 * @api {options} /v1/users/:user_id specific user options
 * @apiVersion 0.0.1
 * @apiName userOptions
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.options('/users/:user_id', function (req, res, next) {
	try {
		resHlpr.send(null, null, null, {
			version: 'v1',
			controller: 'users',
			action: 'options'
		}, req, res, next);
	} catch (err) {
		next(err);
	}
});
/**
 * @api {options} /v1/users user options
 * @apiVersion 0.0.1
 * @apiName usersOptions
 * @apiGroup users
 * @apiPermission user has to have a token
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.options('/users', function (req, res, next) {
	try {
		resHlpr.send(null, null, null, {
			version: 'v1',
			controller: 'users',
			action: 'options'
		}, req, res, next);
	} catch (err) {
		next(err);
	}
});
/**
 * [exports description]
 *
 * @type {[type]}
 */
module.exports = router;