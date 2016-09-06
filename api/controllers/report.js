var winston = require('winston');
var valdHlpr = require('../helpers/validate');
var pageHlpr = require('../helpers/pagination');
var reprtSrv = require('../services/report');
var ReprtMdl = require('../models/report');
/**
 * [findReprts description]
 *
 * @method findReprts
 *
 * @param  {[type]}   _usr_id  [description]
 * @param  {[type]}   page     [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findReprts = function (_usr_id, page, since, until, callback) {
    try {
        if (!valdHlpr.isObjectID(_usr_id)) {
            return callback(Error('invalid user id'), null, 400);
        } else {
            var query = pageHlpr.getQuery({
                _from: _usr_id
            }, since, until);
            var order = pageHlpr.getOrder();
            reprtSrv.findReprts(query, 0, global.constants.QUERY_LIMIT, order, function (err, reprts) {
                if (err) {
                    return callback(err, null, 500);
                }
                return callback(null, reprts, 200);
            });
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};
/**
 * [findReprtById description]
 *
 * @method findReprtById
 *
 * @param  {[type]}    _id      [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.findReprtById = function (_id, callback) {
    try {
        if (!valdHlpr.isObjectID(_id)) {
            return callback(Error('invalid report id'), null, 400);
        } else {
            reprtSrv.findReprtById(_id, function (err, res) {
                if (err) {
                    return callback(err, null, 500);
                } else {
                    return callback(null, res, 200);
                }
            });
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};
/**
 * [insertReprt description]
 *
 * @method insertReprt
 *
 * @param  {[type]}   reprt_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insertReprt = function (reprt_obj, callback) {
    try {
        if (!reprt_obj || Object.keys(reprt_obj).length < 2) {
            return callback(Error('invalid report object or not enough parameters'), null, 400);
        } else {
            var reprt = new ReprtMdl(reprt_obj);
            reprtSrv.insertReprt(reprt, function (err, res) {
                if (err) {
                    return callback(err, null, 500);
                } else {
                    return callback(null, res, 201);
                }
            });
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};
/**
 * [deleteReprtById description]
 *
 * @method deleteReprtById
 *
 * @param  {[type]}        _id      [description]
 * @param  {Function}      callback [description]
 *
 * @return {[type]}        [description]
 */
exports.deleteReprtById = function (_id, callback) {
    try {
        if (!valdHlpr.isObjectID(_id)) {
            return callback(Error('invalid report id'), null, 400);
        } else {
            reprtSrv.deleteReprtById(_id, function (err, res) {
                if (err) {
                    return callback(err, null, 500);
                } else {
                    return callback(null, true, 204);
                }
            });
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};