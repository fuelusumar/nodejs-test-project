var winston = require('winston');
var mongoose = require('mongoose');
var randomstring = require("randomstring");
var valdHlpr = require('../helpers/validate');
var authHlpr = require('../helpers/auth');
var compHlpr = require('../helpers/complete');
var usrSrv = require('../services/user');
var UsrMdl = require('../models/user');
/**
 * [doLogin description]
 *
 * @method doLogin
 *
 * @param  {[type]}   usr      [description]
 * @param  {[type]}   login    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
var doLogin = function (usr, login, callback) {
    try {
        if (usr.usrnm == login.usrnm || usr.email == login.usrnm) {
            var sha256 = authHlpr.sha256(login.passwd, usr.salt.toString());
            if (sha256 === usr.passwd) {
                usrSrv.updateUsrById(usr._id, {
                    is_active: true
                }, function (err, res) {
                    if (err) {
                        return callback(err, null, 500);
                    } else {
                        var deviceRandomId = new mongoose.Types.ObjectId();
                        compHlpr.compLoginUsr(usr, login.device || deviceRandomId.toString(), function (err, res) {
                            if (err) {
                                return callback(err, null, 400);
                            }
                            return callback(null, res, 200);
                        });
                    }
                });
            } else {
                return callback(new Error('invalid password'), null, 400);
            }
        } else {
            return callback(new Error('invalid username or email'), null, 400);
        }
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [signup description]
 *
 * @method signup
 *
 * @param  {[type]}   usr_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.signup = function (usr_obj, callback) {
    try {
        if (!usr_obj || Object.keys(usr_obj).length < 3) {
            return callback(Error('invalid user object or not enough parameters'), null, 400);
        } else {
            var img_str;
            if (usr_obj.img) {
                img_str = usr_obj.img;
                delete usr_obj.img;
            }
            if (usr_obj.usrnm) {
                usr_obj.usrnm = usr_obj.usrnm.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm, '');
            }
            var usr = new UsrMdl(usr_obj);
            usr.passwd = authHlpr.sha256(usr.passwd, usr.salt.toString());
            usr.validate();
            if (usr.name) {
                usr.name = usr.name.trim().replace(/\s\s+/g, ' ');
            }
            usrSrv.insertUsr(usr, function (err_usr, res_usr) {
                if (err_usr) {
                    return callback(err_usr, null, 500);
                } else {
                    var deviceRandomId = new mongoose.Types.ObjectId();
                    compHlpr.compLoginUsr(res_usr, usr_obj.device || deviceRandomId.toString(), function (err, res) {
                        if (err) {
                            return callback(err, null, 400);
                        }
                        return callback(null, res, 201);
                    });
                }
            });
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};
/**
 * [login description]
 *
 * @method login
 *
 * @param  {[type]}   log_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.login = function (log_obj, callback) {
    try {
        if (!log_obj || Object.keys(log_obj).length < 2) {
            return callback(Error('invalid login object or not enough parameters'), null, 400);
        } else {
            if (valdHlpr.isEmail(log_obj.usrnm)) {
                usrSrv.findUsrByEmail(log_obj.usrnm, function (err, usr) {
                    if (err) {
                        return callback(err, null, 500);
                    } else if (usr) {
                        doLogin(usr, log_obj, function (error, result, status) {
                            return callback(error, result, status);
                        });
                    } else {
                        return callback(Error('invalid email or does not exists'), null, 400);
                    }
                });
            } else if (valdHlpr.isUsrnm(log_obj.usrnm)) {
                usrSrv.findUsrByUsrnm(log_obj.usrnm, function (err, usr) {
                    if (err) {
                        return callback(err, null, 500);
                    } else if (usr) {
                        doLogin(usr, log_obj, function (error, result, status) {
                            return callback(error, result, status);
                        });
                    } else {
                        return callback(Error('invalid username or does not exists'), null, 400);
                    }
                });
            } else {
                return callback(Error('invalid login parameter'), null, 400);
            }
        }
    } catch (err) {
        return callback(err, null, 500);
    }
};