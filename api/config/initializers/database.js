var environment = process.env.NODE_ENV || 'development';
var events = require('events');
var eventEmitter = new events.EventEmitter();
var winston = require('winston');
var database = require('../environments/' + environment + '/database.json');
// Bring Mongoose into the app 
var mongoose = require('mongoose');
// Build the connection string 
var dbURI = 'mongodb://' + database.server + ':' + database.port + '/' + database.name;
// Database intialization function
var initDatabase = function () {
	// Create the database connection 
	mongoose.connect(dbURI);
};
// CONNECTION EVENTS 
// When successfully connected 
mongoose.connection.on('connected', function () {
	winston.log('info', 'Mongoose default connection open to %s', dbURI);
});
// If the connection throws an error 
mongoose.connection.on('error', function (err) {
	winston.log('info', 'Mongoose default connection error', err);
});
// When the connection is disconnected 
mongoose.connection.on('disconnected', function () {
	winston.log('info', 'Mongoose default connection disconnected');
});
// action to take when events are emitted
eventEmitter.on('initDatabase', initDatabase);
// events emision
eventEmitter.emit('initDatabase');
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		winston.log('info', 'Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});
//do something when app is closing
/*process.on('exit', function () {
	mongoose.connection.close(function () {
		winston.log('info', 'Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});*/
//catches uncaught exceptions
process.on('uncaughtException', function (err) {
	winston.log('error', 'Error initialazing endpoints', err);
});