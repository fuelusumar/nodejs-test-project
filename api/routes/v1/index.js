var express = require('express');
var router = express.Router();
// split up route handling
var authRouter = require('./auth');
var usersRouter = require('./users');
var reportsRouter = require('./reports');
var endptsHlpr = require('../../helpers/endpoints');
/**
 * @api {all} /v1 all controllers options
 * @apiVersion 0.0.1
 * @apiName allOptions
 * @apiGroup all
 *
 * @apiParam {String} controller specific controller to query
 * @apiParam {String} action specific action to query
 *
 * @apiSuccess {String} action indicates done action
 * @apiSuccess {Object[]} links hypermedia
 */
router.all('/', function (req, res, next) {
  try {
    var controller = req.query.controller || 'auth';
    var action = req.query.action || null;
    var links = endptsHlpr.loadEnpoints('v1', controller).getHyper(req.method, req.headers.host, req.originalUrl, req.params);
    if (action) {
      var _links = [];
      for (var i = links.length - 1; i >= 0; i--) {
        if (links[i].rel == action) {
          _links.push(links[i]);
        }
      }
      links = _links;
    }
    res.status(200).send({
      action: "options",
      links: links
    });
  } catch (err) {
    next(err);
  }
});
// list route namespaces
router.use('/', authRouter);
router.use('/', usersRouter);
router.use('/', reportsRouter);
// etc.
module.exports = router;