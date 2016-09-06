var Model = require('../models/model');
var inspector = require('schema-inspector');
var mongoose = require('mongoose');
/**
 * [sanitization description]
 *
 * @type {Object}
 */
var sanitization = {
    // You can edit the sanitization too
    type: "UsrMdl",
    properties: {
        usrnm: {
            type: "string",
            rules: ["trim", "lower"]
        },
        email: {
            type: "string",
            rules: ["trim", "lower"]
        },
        passwd: {
            type: "string",
            rules: ["trim"]
        }
    }
};
/**
 * [validation description]
 *
 * @type {Object}
 */
var validation = {
    // And the validation!
    type: "UsrMdl",
    properties: {
        usrnm: {
            type: "string",
            minLength: 1
        },
        email: {
            type: "string",
            minLength: 1,
            pattern: 'email'
        },
        passwd: {
            type: "string",
            minLength: 1
        }
    }
};
/**
 * [UsrMdl description]
 *
 * @method UsrMdl
 *
 * @param  {[type]} usrObj [description]
 */
function UsrMdl(usrObj) {
    Model.call(this);
    if (usrObj) {
        this.usrnm = usrObj.usrnm || null;
        this.email = usrObj.email || null;
        this.passwd = usrObj.passwd || null;
        this.salt = usrObj.salt || new mongoose.Types.ObjectId();
        this.name = usrObj.name || null;
        this.bio = usrObj.bio || null;
        this.avatar_url = usrObj.avatar_url || null;
        this.email_verfd = usrObj.email_verfd || false;
        inspector.sanitize(sanitization, this);
    }
}
// inheritance of Model.prototype
UsrMdl.prototype = Object.create(Model.prototype);
// set UsrMdl function as constructor
UsrMdl.prototype.constructor = UsrMdl;
/**
 * [validate description]
 *
 * @method validate
 *
 * @return {[type]} [description]
 */
UsrMdl.prototype.validate = function () {
    var inspect = inspector.validate(validation, this);
    if (!inspect.valid) {
        throw new Error(inspect.format());
    }
};
/**
 * [sanitize description]
 *
 * @method sanitize
 *
 * @return {[type]} [description]
 */
UsrMdl.prototype.sanitize = function () {
    inspector.sanitize(sanitization, this);
};
/**
 * [init description]
 *
 * @method init
 *
 * @param  {[type]} usrSchema [description]
 *
 * @return {[type]} [description]
 */
UsrMdl.prototype.init = function (usrSchema) {
    this._id = usrSchema._id;
    this.usrnm = usrSchema.usrnm ? usrSchema.usrnm : null;
    this.email = usrSchema.email ? usrSchema.email : null;
    this.passwd = usrSchema.passwd ? usrSchema.passwd : null;
    this.salt = usrSchema.salt;
    this.name = usrSchema.name ? usrSchema.name : null;
    this.bio = usrSchema.bio ? usrSchema.bio : null;
    this.avatar_url = usrSchema.avatar_url ? usrSchema.avatar_url : null;
    this.email_verfd = usrSchema.email_verfd;
    this.upd_at = usrSchema.upd_at;
    inspector.sanitize(sanitization, this);
};
// export the class
module.exports = UsrMdl;