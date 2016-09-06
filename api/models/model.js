var mongoose = require('mongoose');
/**
 * [Model description]
 *
 * @method Model
 */
function Model() {}
/**
 * [set description]
 *
 * @method set
 */
Model.prototype.set = function () {
    var model = {};
    var type, value;
    for (var key in this) {
        value = this[key];
        type = typeof value;
        if (key !== '_id' && key != 'upd_at' && type !== 'function' && type !== 'undefined') {
            model[key] = this[key];
        }
    }
    model.upd_at = new mongoose.Types.ObjectId();
    return model;
};
/**
 * [init description]
 *
 * @method init
 *
 * @param  {[type]} schema     [description]
 * @param  {[type]} properties [description]
 *
 * @return {[type]}            [description]
 */
/******************************************************************************
Model.prototype.init = function (schema, properties) {
    var key, value, type;
    for (var i = properties.length - 1; i >= 0; i--) {
        key = properties[i];
        value = schema[key];
        type = typeof value;
        if (type !== 'function' && type !== 'undefined' && key !== 'passwd') {
            this[key] = schema[key];
        }
    }
};
******************************************************************************/
/**
 * [show description]
 *
 * @method show
 *
 * @return {[type]} [description]
 */
Model.prototype.show = function () {
    var type, value, model = {};
    for (var key in this) {
        value = this[key];
        type = typeof value;
        if (type !== 'function' && type !== 'undefined' && key !== 'passwd') {
            model[key] = value;
        }
    }
    if ('is_private' in model && model.is_private) {
        delete model.email;
        delete model.bday;
        delete model.sex;
        delete model.lang;
        delete model.country;
        delete model.is_verfied;
    }
    return model;
};
// export the class
module.exports = Model;