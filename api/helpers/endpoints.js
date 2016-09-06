/**
 * [Endpoints description]
 *
 * @method Endpoints
 *
 * @param  {Boolean} is_hyper [description]
 * @param  {[type]}  links    [description]
 */
function Endpoints(is_hyper, links) {
	this.is_hyper = is_hyper;
	this.links = links;
}
/**
 * [getHyper description]
 *
 * @method getHyper
 *
 * @param  {[type]} method [description]
 * @param  {[type]} host   [description]
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 *
 * @return {[type]} [description]
 */
Endpoints.prototype.getHyper = function (method, host, url, params) {
	if (this.is_hyper && method && host && url) {
		var _links = [];
		for (var i = 0; i < this.links.length; i++) {
			var _link = {};
			_link.method = this.links[i].method;
			_link.href = host + this.links[i].href;
			for (var key in params) {
				_link.href = _link.href.replace(':' + key, params[key]);
			}
			if (_link.method == method && _link.href == host + url) {
				_link.rel = 'self';
			} else {
				_link.rel = this.links[i].rel;
			}
			_links.push(_link);
		}
		return _links;
	}
	return this.links;
};
/**
 * [getLinks description]
 *
 * @method getLinks
 *
 * @return {[type]} [description]
 */
Endpoints.prototype.getLinks = function () {
	return this.links;
};
/**
 * [loadEnpoints description]
 *
 * @method loadEnpoints
 *
 * @param  {[type]}     version    [description]
 * @param  {[type]}     controller [description]
 *
 * @return {[type]}     [description]
 */
exports.loadEnpoints = function (version, controller) {
	var index;
	var array = [];
	if (version && controller) {
		if (controller == 'auth') {
			for (index in global.endpoints[version]) {
				array = array.concat(global.endpoints[version][index]);
			}
		} else {
			array = global.endpoints[version][controller];
		}
		return new Endpoints(true, array);
	} else {
		for (index in global.endpoints[version]) {
			array = array.concat(global.endpoints[version][index]);
		}
		return new Endpoints(false, array);
	}
};