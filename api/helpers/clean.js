var UsrMdl = require('../models/user');
/**
 * [clnMdl description]
 *
 * @method clnMdl
 *
 * @param  {[type]} mdl [description]
 * @param  {[type]} path [description]
 *
 * @return {[type]} [description]
 */
var clnMdl = function (mdl, path) {
	var usrMdl, _mdl = {};
	var _path = path.split(' ');
	if (mdl && Array.isArray(_path) && _path.length > 0) {
		for (var key in mdl) {
			if (path.indexOf(key) > -1) {
				if (key == '_usr' || key == '_flw' || key == '_to' || key == '_from') {
					if (mdl[key]) {
						usrMdl = new UsrMdl();
						usrMdl.init(mdl[key]);
						_mdl[key] = usrMdl.show();
					} else {
						_mdl[key] = mdl[key];
					}
				} else {
					_mdl[key] = mdl[key];
				}
			} else {
				_mdl[key] = mdl[key];
			}
		}
		return _mdl;
	}
	return mdl;
};
/**
 * [clnMdlLst description]
 *
 * @method clnMdlLst
 *
 * @param  {[type]}   mdls [description]
 * @param  {[type]}   path  [description]
 *
 * @return {[type]}   [description]
 */
var clnMdlLst = function (mdls, path) {
	if (Array.isArray(mdls) && mdls.length > 0) {
		var _mdls = [];
		for (var i = 0, l = mdls.length; i < l; i++) {
			_mdls.push(clnMdl(mdls[i], path));
		}
		return _mdls;
	}
	return mdls;
};
//
exports.clnMdl = clnMdl;
//
exports.clnMdlLst = clnMdlLst;