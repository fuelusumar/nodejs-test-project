/**
 * [getQuery description]
 *
 * @param  {[type]} object [description]
 * @param  {[type]} since  [description]
 * @param  {[type]} until  [description]
 *
 * @return {[type]}        [description]
 */
exports.getQuery = function (object, since, until, id) {
    var query;
    var item;
    if (since || until) {
        if ('$and' in object) {
            query = object;
        } else {
            query = {
                '$and': []
            };
            for (var key in object) {
                item = {};
                item[key] = object[key];
                query.$and.push(item);
            }
        }
        if (until) {
            item = {};
            item[id || '_id'] = {
                '$lt': until
            };
            query.$and.push(item);
        }
        if (since) {
            item = {};
            item[id || '_id'] = {
                '$gt': since
            };
            query.$and.push(item);
        }
    } else {
        query = object;
    }
    return query;
};
/**
 * [getOrder description]
 *
 * @param  {[type]} object [description]
 *
 * @return {[type]}        [description]
 */
exports.getOrder = function (object) {
    if (object) {
        return object;
    } else {
        var order = {
            _id: -1
        };
        return order;
    }
};