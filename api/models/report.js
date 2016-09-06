var Model = require('../models/model');
/**
 * [ReprtMdl description]
 *
 * @method ReprtMdl
 *
 * @param  {[type]} reprtObj [description]
 */
function ReprtMdl(reprtObj) {
    Model.call(this);
    if (reprtObj) {
        this._usr = reprtObj._usr || null;
        this.time = +reprtObj.time || 0;
        this.date = reprtObj.date || null;
        this.description = reprtObj.description || null;
    }
}
//
ReprtMdl.prototype = Object.create(Model.prototype);
//
ReprtMdl.prototype.constructor = ReprtMdl;
/**
 * [init description]
 *
 * @method init
 *
 * @param  {[type]} reprtSchema [description]
 *
 * @return {[type]} [description]
 */
ReprtMdl.prototype.init = function (reprtSchema) {
    this._id = reprtSchema._id;
    this._usr = reprtSchema._usr ? reprtSchema._usr : null;
    this.time = reprtSchema.time ? reprtSchema.time : 0;
    this.date = reprtSchema.date ? reprtSchema.date : null;
    this.description = reprtSchema.description ? reprtSchema.description : null;
    this.upd_at = reprtSchema.upd_at;
};
// export the class
module.exports = ReprtMdl;