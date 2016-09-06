var winston = require('winston');
var valdHlpr = require('../helpers/validate');
var authHlpr = require('../helpers/auth');
var usrSrv = require('../services/user');
var UsrMdl = require('../models/user');
/**
 * [updateUser description]
 *
 * @method updateUser
 *
 * @param  {[type]}   usr      [description]
 * @param  {[type]}   upd      [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}            [description]
 */
var updateUser = function (usr, upd, callback) {
    var cnt = 0;
    if ('new_passwd' in upd && 'old_passwd' in upd) {
        if ('passwd' in upd) {
            delete upd.passwd;
        }
        if (authHlpr.sha256(upd.old_passwd, usr.salt.toString()) === usr.passwd) {
            upd.passwd = authHlpr.sha256(upd.new_passwd, usr.salt.toString());
            delete upd.old_passwd;
            delete upd.new_passwd;
        } else {
            return callback(new Error('Wrong password'), null, 403);
        }
    }
    for (var key in upd) {
        if (key === 'avatar_url') {
            winston.log('info', 'Changing image');
        }
        if (upd[key] != usr[key]) {
            usr[key] = upd[key];
            if (key != '_id') {
                cnt++;
            }
        }
    }
    if (cnt > 0) {
        usr.sanitize();
        usr.validate();
        usrSrv.updateUsrById(usr._id, usr.set(), function (err, res) {
            if (err) {
                return callback(err, null, 500);
            } else {
                delete usr.passwd;
                return callback(null, usr, 200);
            }
        });
    } else {
        delete usr.passwd;
        return callback(null, usr, 304);
    }
};
/**
 * [updateOrPatchUsr description]
 *
 * @method updateOrPatchUsr
 *
 * @param  {[type]}      usr_obj  [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.updateOrPatchUsr = function (usr_obj, callback) {
    try {
        if (!usr_obj || Object.keys(usr_obj).length < 2) {
            return callback(Error('invalid user object or not enough parameters'), null, 400);
        } else if (!valdHlpr.isObjectID(usr_obj._id)) {
            return callback(Error('invalid user id'), null, 400);
        } else {
            usrSrv.findUsrById(usr_obj._id, function (err, usr) {
                if (err) {
                    return callback(err, null, 500);
                } else {
                    if (usr_obj.usrnm) {
                        usr_obj.usrnm = usr_obj.usrnm.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm, '');
                    }
                    if (usr_obj.name) {
                        usr_obj.name = usr_obj.name.trim().replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, ' ');
                    }
                    if (usr_obj.bio) {
                        usr_obj.bio = usr_obj.bio.trim().replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, ' ');
                    }
                    updateUser(usr, usr_obj, function (err, res, status) {
                        return callback(err, res, status);
                    });
                }
            });
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};
/**
 * [deleteUsrById description]
 *
 * @method deleteUsrById
 *
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.deleteUsrById = function (_id, callback) {
    try {
        if (!valdHlpr.isObjectID(_id)) {
            return callback(Error('invalid user id'), null, 400);
        } else {
            usrSrv.deleteUsrById(_id, function (err, res) {
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