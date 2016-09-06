var mongoose = require('mongoose');
var winston = require('winston');
/**
 * [Dao Constructor]
 *
 * @method Dao
 *
 * @param  {[type]} ref        [description]
 * @param  {[type]} schema     [description]
 * @param  {[type]} model      [description]
 */
function Dao(ref, schema, model) {
    'use strict';
    // always initialize all instance properties
    this.Schema = mongoose.model(ref, schema);
    this.Model = model;
    if (arguments.length > 3 && arguments.length % 3 === 0) {
        var j = 0;
        for (var i = 3; i < arguments.length; i += 3) {
            var path_ref = arguments[i],
                path_schema = arguments[i + 1],
                path_model = arguments[i + 2];
            if (path_ref && path_schema && path_model) {
                this['PathSchema_' + j] = mongoose.model(path_ref, path_schema);
                this['PathModel_' + j] = path_model;
            }
        }
    }
    this.Schema.ensureIndexes(function (err, res) {
        if (err) {
            winston.log('error', 'Mongoose default connection error', err);
        }
    });
}
/**
 * [findSchemaById description]
 *
 * @method findSchemaById
 *
 * @param  {[type]}       _id      [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
Dao.prototype.findSchemaById = function (_id, select, path, callback) {
    'use strict';
    try {
        var that = this;
        this.Schema.findOne({
            '_id': _id
        }).select(select).populate(path).exec(function (err, schema) {
            if (err) {
                return callback(err, null);
            }
            if (schema) {
                var model = new that.Model();
                model.init(schema);
                return callback(null, model);
            }
            return callback(null, null);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findSchema description]
 *
 * @method findSchema
 *
 * @param  {[type]}   query    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
Dao.prototype.findSchema = function (query, select, path, callback) {
    'use strict';
    try {
        var that = this;
        this.Schema.findOne(query).select(select).populate(path).exec(function (err, schema) {
            if (err) {
                return callback(err, null);
            }
            if (schema) {
                var model = new that.Model();
                model.init(schema);
                return callback(null, model);
            }
            return callback(null, null);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findSchemaLst description]
 *
 * @method findSchemaLst
 *
 * @param  {[type]}      query    [description]
 * @param  {[type]}      skip     [description]
 * @param  {[type]}      limit    [description]
 * @param  {[type]}      sort     [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
Dao.prototype.findSchemaLst = function (query, select, skip, limit, sort, path, callback) {
    'use strict';
    try {
        var that = this;
        this.Schema.find(query).select(select).skip(skip).limit(limit).sort(sort).populate(path).exec(function (err, schemas) {
            if (err && !schemas) {
                return callback(err, null);
            }
            var i, l, models, model;
            models = [];
            for (i = 0, l = schemas.length; i < l; i++) {
                model = new that.Model();
                model.init(schemas[i]);
                models.push(model);
            }
            return callback(err, models);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findAllSchemaLst description]
 *
 * @method findAllSchemaLst
 *
 * @param  {[type]}         query    [description]
 * @param  {[type]}         sort     [description]
 * @param  {Function}       callback [description]
 *
 * @return {[type]}         [description]
 */
Dao.prototype.findAllSchemaLst = function (query, select, sort, path, callback) {
    'use strict';
    try {
        var that = this;
        this.Schema.find(query).select(select).sort(sort).populate(path).exec(function (err, schemas) {
            if (err && !schemas) {
                return callback(err, null);
            }
            var i, l, models, model;
            models = [];
            for (i = 0, l = schemas.length; i < l; i++) {
                model = new that.Model();
                model.init(schemas[i]);
                models.push(model);
            }
            return callback(err, models);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [updateSchema description]
 *
 * @method updateSchema
 *
 * @param  {[type]}     condition [description]
 * @param  {[type]}     update    [description]
 * @param  {[type]}     options   [description]
 * @param  {Function}   callback  [description]
 *
 * @return {[type]}     [description]
 */
Dao.prototype.updateSchema = function (condition, update, options, callback) {
    'use strict';
    try {
        this.Schema.update(condition, update, options, function (err, res) {
            if (err && !res) {
                return callback(err, null);
            }
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [insertSchema description]
 *
 * @method insertSchema
 *
 * @param  {[type]}     model    [description]
 * @param  {Function}   callback [description]
 *
 * @return {[type]}     [description]
 */
Dao.prototype.insertSchema = function (model, callback) {
    'use strict';
    try {
        var schema = new this.Schema(model);
        var that = this;
        schema.save(function (err, sch) {
            if (err) {
                return callback(err, null);
            }
            if (sch) {
                var mdl = new that.Model();
                mdl.init(sch);
                return callback(null, mdl);
            }
            return callback(null, null);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findAndPopulateSchemaById description]
 *
 * @method findAndPopulateSchemaById
 *
 * @param  {[type]}                  _id      [description]
 * @param  {[type]}                  path     [description]
 * @param  {Function}                callback [description]
 *
 * @return {[type]}                  [description]
 */
Dao.prototype.pushToArray = function (condition, array_name, array_item, options, callback) {
    'use strict';
    try {
        var push = {};
        push[array_name] = array_item;
        this.Schema.update(condition, {
            '$push': push
        }, options, function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findAndPopulateSchemaById description]
 *
 * @method findAndPopulateSchemaById
 *
 * @param  {[type]}                  _id      [description]
 * @param  {[type]}                  path     [description]
 * @param  {Function}                callback [description]
 *
 * @return {[type]}                  [description]
 */
Dao.prototype.pullFromArray = function (condition, array_name, array_item, options, callback) {
    'use strict';
    try {
        var pull = {};
        pull[array_name] = array_item;
        this.Schema.update(condition, {
            '$pull': pull
            //{
            //    'usrs': _prof_id
            //}
        }, options, function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findAndPopulateSchemaById description]
 *
 * @method findAndPopulateSchemaById
 *
 * @param  {[type]}                  _id      [description]
 * @param  {[type]}                  path     [description]
 * @param  {Function}                callback [description]
 *
 * @return {[type]}                  [description]
 */
Dao.prototype.deleteSchemaById = function (_id, callback) {
    'use strict';
    try {
        this.Schema.remove({
            _id: _id
        }, function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [deleteSchema description]
 *
 * @method deleteSchema
 *
 * @param  {[type]}   query    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
Dao.prototype.deleteSchema = function (query, callback) {
    'use strict';
    try {
        this.Schema.remove(query, function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [deleteSchemaLst description]
 *
 * @method deleteSchemaLst
 *
 * @param  {[type]}        query    [description]
 * @param  {Function}      callback [description]
 *
 * @return {[type]}                 [description]
 */
Dao.prototype.deleteSchemaLst = function (query, callback) {
    'use strict';
    try {
        this.Schema.find(query).remove(function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [countSchema description]
 *
 * @method countSchema
 *
 * @param  {[type]}    query    [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
Dao.prototype.countSchema = function (query, callback) {
    'use strict';
    try {
        this.Schema.count(query, function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [aggregateSchema description]
 *
 * @method aggregateSchema
 *
 * @param  {[type]}        query    [description]
 * @param  {[type]}        limit    [description]
 * @param  {[type]}        sort     [description]
 * @param  {Function}      callback [description]
 *
 * @return {[type]}                 [description]
 */
Dao.prototype.aggregateSchema = function (query, limit, sort, callback) {
    try {
        this.Schema.aggregate(query).limit(limit).sort(sort).exec(function (err, res) {
            return callback(err, res);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [distinctSchemaLst description]
 *
 * @method distinctSchemaLst
 *
 * @param  {[type]}          query    [description]
 * @param  {[type]}          distinct [description]
 * @param  {Function}        callback [description]
 *
 * @return {[type]}                   [description]
 */
Dao.prototype.distinctAllSchemaLst = function (query, distinct, callback) {
    'use strict';
    try {
        var that = this;
        this.Schema.find(query).exec(function (err, schemas) {
            if (err && !schemas) {
                return callback(err, null);
            }
            var i, l, models, model;
            models = [];
            for (i = 0, l = schemas.length; i < l; i++) {
                model = new that.Model();
                model.init(schemas[i]);
                models.push(model);
            }
            var uniques = models.filter(function (element, index, array) {
                if (distinct in element && element[distinct]) {
                    for (var i = array.length - 1; i >= 0; i--) {
                        if (element[distinct] == array[i][distinct]) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return true;
                }
            });
            return callback(err, uniques.sort(function (a, b) {
                var _a = a[distinct] + '';
                var _b = b[distinct] + '';
                if (_a < _b) {
                    return 1;
                }
                if (_a > _b) {
                    return -1;
                }
                return 0;
            }));
        });
    } catch (err) {
        return callback(err, null);
    }
};
// export the class
module.exports = Dao;