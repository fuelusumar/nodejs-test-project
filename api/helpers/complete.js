var winston = require('winston');
/**
 * [compLoginUsr description]
 *
 * @method compLoginUsr
 *
 * @param  {[type]}     usr      [description]
 * @param  {Function}   callback [description]
 *
 * @return {[type]}     [description]
 */
exports.compLoginUsr = function (usr, device, callback) {
    try {
        delete usr.passwd;
        delete usr.salt;
        return callback(null, usr);
    } catch (err) {
        callback(err, null);
    }
};