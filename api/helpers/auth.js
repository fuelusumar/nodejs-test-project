var crypto = require('crypto');
var jwt = require('jsonwebtoken');
/**
 * [getToken description]
 *
 * @method getToken
 *
 * @param  {[type]} _id [description]
 * @param  {[type]} usrnm   [description]
 *
 * @return {[type]} [description]
 */
var getToken = function (_id, usrnm) {
    return jwt.sign({
        _id: _id,
        usrnm: usrnm
    }, global.security.options.secret, {
        expiresIn: global.security.options.expires_in
    });
};
/**
 * [sha256 description]
 *
 * @method sha256
 *
 * @param  {[type]} str [description]
 * @param  {[type]} salt   [description]
 *
 * @return {[type]}        [description]
 */
var sha256 = function (str, salt) {
    var hmac = crypto.createHmac('sha256', salt);
    var hash = hmac.update(str).digest('base64');
    return hash;
};
/**
 * [renewToken description]
 *
 * @method renewToken
 *
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 *
 * @return {[type]}   [description]
 */
var renewToken = function (req, res, next) {
    var date = new Date();
    var now = Math.floor(date.getTime() / 1000);
    var token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, global.security.options.secret);
    if (decoded.exp >= now) {
        if (req.headers['user-agent'] == decoded.usrnm || req.headers.from == decoded.usrnm) {
            if (req.url === '/users/' + req.user._id && (req.method === 'PUT' || req.method === 'PATCH') && req.body && req.body.usrnm && req.body.usrnm !== req.headers['user-agent']) {
                req.auth = getToken(decoded._id, req.body.usrnm);
                req._id = decoded._id;
                next();
            } else {
                req.auth = getToken(decoded._id, decoded.usrnm);
                req._id = decoded._id;
                next();
            }
        } else {
            next(new Error('invalid user agent'));
        }
    } else {
        next(new Error('token has expired'));
    }
};
//
module.exports = {
    getToken: getToken,
    sha256: sha256,
    renewToken: renewToken
};