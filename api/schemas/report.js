var mongoose = require('mongoose');
/**
 * [reprtSchema description]
 *
 * @type {[type]}
 */
var reprtSchema = mongoose.Schema({
    _usr: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usr'
    },
    time: {
        type: Number,
        min: 0,
        max: 2,
        'default': 0
    },
    date: {
        type: Date,
        'default': new Date()
    },
    description: {
        type: String,
        trim: true,
        'default': null
    },
    upd_at: {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    }
}, {
    collection: 'reprts',
    autoIndex: false
});
/**
 * [_to description]
 *
 * @type {number}
 */
reprtSchema.index({
    _usr: 1
}, {
    name: "reprts_cp_indx"
});
//
module.exports = reprtSchema;