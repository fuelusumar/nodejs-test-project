var winston = require('winston');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var environment = process.env.NODE_ENV || 'development';
var constants = require('../environments/' + environment + '/constants.json');
/**
 * [initConstants description]
 *
 * @method initConstants
 *
 * @return {[type]}      [description]
 */
var initConstants = function () {
	winston.log('info', 'Initialazing constants...');
	global.constants = constants;
};
// action to take when events are emitted
eventEmitter.on('initConstants', initConstants);
// events emision
eventEmitter.emit('initConstants');
process.on('uncaughtException', function (err) {
	winston.log('error', 'Error initialazing constants', err);
});