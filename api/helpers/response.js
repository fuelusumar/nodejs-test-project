var util = require('util');
var endptsHlpr = require('../helpers/endpoints');
var authHlpr = require('../helpers/auth');
/**
 * [send description]
 *
 * @method send
 *
 * @param  {[type]}   error    [description]
 * @param  {[type]}   result   [description]
 * @param  {[type]}   status   [description]
 * @param  {[type]}   options  [description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 *
 * @return {[type]}   [description]
 */
var send = function (error, result, status, options, request, response, next) {
    if (error) {
        error.status = status;
        next(error);
    } else {
        response.status(status || 200)
            .send({
                action: options.action,
                data: result || {},
                links: endptsHlpr.loadEnpoints(options.version, options.controller)
                    .getHyper(request.method, request.headers.host, request.originalUrl, request.params),
                auth: request.auth || authHlpr.getToken(result._id, result.usrnm)
            });
    }
};
/**
 * [redirect description]
 *
 * @method redirect
 *
 * @param  {[type]}   error    [description]
 * @param  {[type]}   status   [description]
 * @param  {[type]}   url      [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 *
 * @return {[type]}            [description]
 */
var redirect = function (error, status, url, response, next) {
    if (error) {
        error.status = status;
        next(error);
    } else {
        response.writeHead(301, {
            'Location': url
        });
        response.end();
    }
};
/**
 * [exports description]
 *
 * @type {Object}
 */
module.exports = {
    send: send,
    redirect: redirect
};