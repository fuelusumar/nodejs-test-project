var express = require('express');
var router = express.Router();
var resHlpr = require('../../helpers/response');
var authHlpr = require('../../helpers/auth');
var reprtCtrl = require('../../controllers/report');
var expressJWT = require('express-jwt');
/**
 * JWT middleware
 */
router.use(expressJWT(global.security.options));
router.use(authHlpr.renewToken);
/**
 * @api {get} /v1/users/:user_id/reports list reports from user
 * @apiVersion 0.0.1
 * @apiName findReprts
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Number} page number of page
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} data array of report objects
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.get('/users/:user_id/reports', function (req, res, next) {
    try {
        // findReprts(_usr_id, page, callback)
        var since = req.query.since || null;
        var until = req.query.until || null;
        var page = parseInt(req.query.page, 10) || 1;
        reprtCtrl.findReprts(req.body.user_id, page, since, until, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'reports',
                action: 'list'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {get} /v1/users/:user_id/reports/:report_id retrieve a report
 * @apiVersion 0.0.1
 * @apiName findReprtById
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} report_id report unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data report object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.get('/users/:user_id/reports/:report_id', function (req, res, next) {
    try {
        // findReprtById(_id, callback)
        reprtCtrl.findReprtById(req.params.report_id, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'reports',
                action: 'retrieve'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {post} /v1/users/:user_id/reports create a share report
 * @apiVersion 0.0.1
 * @apiName insertReprt
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {Object} body request body
 * @apiParam {ObjectID} body.date date of the report
 * @apiParam {ObjectID} body.time how many hours are being reported
 * @apiParam {ObjectID} body.description report description
 *
 * @apiSuccess (Success 201) {String} action indicates done action
 * @apiSuccess (Success 201) {Object} data report object
 * @apiSuccess (Success 201) {Object[]} links hypermedia
 * @apiSuccess (Success 201) {String} auth authorization token
 */
router.post('/users/:user_id/reports', function (req, res, next) {
    try {
        // insertReprt(flw_obj, callback)
        req.body._usr = req.params.user_id;
        reprtCtrl.insertReprt(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'reports',
                action: 'create'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {put} /v1/users/:user_id/reports/:report_id update a report
 * @apiVersion 0.0.1
 * @apiName updateReprt
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} report_id reports unique id
 * @apiParam {Object} body request body
 * @apiParam {ObjectID} body.date date of the report
 * @apiParam {ObjectID} body.time how many hours are being reported
 * @apiParam {ObjectID} body.description report description
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data report object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.put('/users/:user_id/reports/:report_id', function (req, res, next) {
    try {
        req.body._id = req.params.report_id;
        req.body._usr = req.params.user_id;
        reprtCtrl.updateOrPatchReprt(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'reports',
                action: 'update'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {patch} /v1/users/:user_id/reports/:report_id partially update a report
 * @apiVersion 0.0.1
 * @apiName patchReprt
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} report_id reports unique id
 * @apiParam {Object} body request body
 * @apiParam {ObjectID} body.date date of the report
 * @apiParam {ObjectID} body.time how many hours are being reported
 * @apiParam {ObjectID} body.description report description
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object} data report object
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.patch('/users/:user_id/reports/:report_id', function (req, res, next) {
    try {
        req.body._id = req.params.report_id;
        req.body._usr = req.params.user_id;
        reprtCtrl.updateOrPatchReprt(req.body, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'reports',
                action: 'partial'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {delete} /v1/users/:user_id/reports/:report_id delete a report
 * @apiVersion 0.0.1
 * @apiName deleteReprtById
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} report_id post unique id
 *
 * @apiSuccess (Success 204) {Undefined} data no content
 */
router.delete('/users/:user_id/reports/:report_id', function (req, res, next) {
    try {
        reprtCtrl.deleteReprtById(req.params.report_id, function (error, result, status) {
            resHlpr.send(error, result, status, {
                version: 'v1',
                controller: 'reports',
                action: 'delete'
            }, req, res, next);
        });
    } catch (err) {
        next(err);
    }
});
/**
 * @api {options} /v1/users/:user_id/reports/:report_id specific report options
 * @apiVersion 0.0.1
 * @apiName reportOptions
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 * @apiParam {ObjectID} report_id report unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.options('/users/:user_id/reports/:report_id', function (req, res, next) {
    try {
        resHlpr.send(null, null, null, {
            version: 'v1',
            controller: 'reports',
            action: 'list'
        }, req, res, next);
    } catch (err) {
        next(err);
    }
});
/**
 * @api {options} /v1/users/:user_id/reports report options
 * @apiVersion 0.0.1
 * @apiName reportsOptions
 * @apiGroup reports
 * @apiPermission user has to have a token
 *
 * @apiParam {ObjectID} user_id users unique id
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 * @apiSuccess {String} auth authorization token
 */
router.options('/users/:user_id/reports', function (req, res, next) {
    try {
        resHlpr.send(null, null, null, {
            version: 'v1',
            controller: 'reports',
            action: 'list'
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