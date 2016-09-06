var mongoose = require('mongoose');
var Dao = require('../helpers/dao');
var UsrMdl = require('../models/user');
var usrSch = require('../schemas/user');
var ReprtMdl = require('../models/report');
var reprtSch = require('../schemas/report');
var clnHlpr = require('../helpers/clean');
/**
 * [reprtDao description]
 *
 * @type {Dao}
 */
var reprtDao = new Dao('Reprt', reprtSch, ReprtMdl, 'Usr', usrSch, UsrMdl);
/**
 * [insertReprt description]
 *
 * @method insertReprt
 *
 * @param  {[type]}   reprt_mdl  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insertReprt = function (reprt_mdl, callback) {
	reprtDao.insertSchema(reprt_mdl, function (err, reprt) {
		return callback(err, reprt);
	});
};
/**
 * [updateReprtById description]
 *
 * @method updateReprtById
 *
 * @param  {[type]}       _id      [description]
 * @param  {[type]}       set      [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.updateReprtById = function (_id, set, callback) {
	reprtDao.updateSchema({
		_id: _id
	}, set, {}, function (err, usr) {
		return callback(err, usr);
	});
};
/**
 * [findReprtById description]
 *
 * @method findReprtById
 *
 * @param  {[type]}     _id      [description]
 * @param  {Function}   callback [description]
 *
 * @return {[type]}     [description]
 */
exports.findReprtById = function (_id, callback) {
	reprtDao.findSchemaById(_id, '', '_to _from _pst _cmnt', function (err, reprt) {
		reprt = clnHlpr.clnMdl(reprt, '');
		return callback(err, reprt);
	});
};
/**
 * [findReprts description]
 *
 * @method findReprts
 *
 * @param  {[type]}   query    [description]
 * @param  {[type]}   skip     [description]
 * @param  {[type]}   limit    [description]
 * @param  {[type]}   order    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findReprts = function (query, skip, limit, order, callback) {
	reprtDao.findSchemaLst(query, '', skip, limit, order, '', function (err, reprts) {
		reprts = clnHlpr.clnMdlLst(reprts, '');
		return callback(err, reprts);
	});
};
/**
 * [deleteReprtById description]
 *
 * @method deleteReprtById
 *
 * @param  {[type]}       _id      [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.deleteReprtById = function (_id, callback) {
	reprtDao.deleteSchemaById(_id, function (err, reprt) {
		return callback(err, reprt);
	});
};
/**
 * [countReprts description]
 *
 * @method countReprts
 *
 * @param  {[type]}   query    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.countReprts = function (query, callback) {
	reprtDao.countSchema(query, function (err, reprts) {
		return callback(err, reprts);
	});
};