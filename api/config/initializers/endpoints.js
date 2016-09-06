var winston = require('winston');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var environment = process.env.NODE_ENV || 'development';
var endpoints = require('../environments/' + environment + '/endpoints.json');
var versions = endpoints.versions;
var endpoints = [];
var default_actions = [
	{
		"method": "GET",
		"name": "list",
		"id": false
	}, {
		"method": "POST",
		"name": "create",
		"id": false
	}, {
		"method": "GET",
		"name": "retrieve",
		"id": true
	}, {
		"method": "PUT",
		"name": "update",
		"id": true
	}, {
		"method": "PATCH",
		"name": "partial",
		"id": true
	}, {
		"method": "DELETE",
		"name": "delete",
		"id": true
	}
];
/**
 * builds the endpoint object
 *
 * @method getEndpoint
 *
 * @param  {[type]} action     CRUD action that this endpoint executes
 * @param  {[type]} method     HTTP method for endpoint
 * @param  {[type]} base       base url or start of endpoint
 * @param  {[type]} controller controller that owns the action
 * @param  {[type]} id         specifies if the endpoint uses id
 * @param  {[type]} append     specifies if the endpoint ends with the action name
 *
 * @return {[type]} endpoint object
 */
var getEndpoint = function (action, method, base, controller, id, append) {
	var head = base + '/' + controller;
	var tail = id ? '/:' + id : '';
	tail += append ? '/' + action : '';
	var endpoint = {
		'method': method,
		'href': head + tail,
		'rel': action
	};
	return endpoint;
};
/**
 * [getControllerEndpoints description]
 *
 * @method getControllerEndpoints
 *
 * @param  {[type]}            base       [description]
 * @param  {[type]}            version    [description]
 * @param  {[type]}            controller [description]
 *
 * @return {[type]}            [description]
 */
var getControllerEndpoints = function (base, version, controller) {
	var controllers = controller.controllers || null;
	var actions = controller.actions || default_actions;
	endpoints[version.name][controller.name] = [];
	for (var i = 0; i < actions.length; i++) {
		var action = actions[i];
		endpoints[version.name][controller.name].push(getEndpoint(action.name, action.method, base, controller.name, action.id ? controller.id : null, action.append));
	}
	if (controllers && controllers.length > 0) {
		base += '/' + controller.name + '/:' + controller.id;
		for (var j = 0; j < controllers.length; j++) {
			getControllerEndpoints(base, version, controllers[j]);
		}
	}
	winston.log('info', '%s controller %s version endpoints initialized', controller.name, version.name);
};
/**
 * [getVersionEndpoints description]
 *
 * @method getVersionEndpoints
 *
 * @param  {[type]}         version [description]
 *
 * @return {[type]}         [description]
 */
var getVersionEndpoints = function (version) {
	var controllers = version.controllers;
	var base = '/' + version.name;
	endpoints[version.name] = [];
	for (var i = 0; i < controllers.length; i++) {
		getControllerEndpoints(base, version, controllers[i]);
	}
	winston.log('info', '%s version endpoints initialized', version.name);
};
/**
 * [initEndpoints description]
 *
 * @method initEndpoints
 *
 * @return {[type]}   [description]
 */
var initEndpoints = function () {
	winston.log('info', 'Initialazing endpoints...');
	for (var i = 0; i < versions.length; i++) {
		getVersionEndpoints(versions[i]);
	}
	global.endpoints = endpoints;
};
// action to take when events are emitted
eventEmitter.on('initEndpoints', initEndpoints);
// events emision
eventEmitter.emit('initEndpoints');
process.on('uncaughtException', function (err) {
	winston.log('error', 'Error initialazing endpoints', err);
});