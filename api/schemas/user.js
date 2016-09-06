var mongoose = require('mongoose');
/**
 * [usrSchema description]
 *
 * @type {[type]}
 */
var usrSchema = mongoose.Schema({
    usrnm: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate: /^[a-zA-Z][a-zA-Z0-9\._\-]{3,14}?[a-zA-Z0-9]{0,2}$/
    },
    passwd: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    },
    salt: {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    },
    name: {
        type: String,
        trim: true,
        'default': null
    },
    bio: {
        type: String,
        trim: true,
        'default': null
    },
    email_verfd: {
        type: Boolean,
        'default': false
    },
    avatar_url: {
        type: String,
        trim: true,
        'default': null
    },
    upd_at: {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    }
}, {
    collection: 'usrs',
    autoIndex: false
});
/**
 * [usrnm description]
 *
 * @type {[type]}
 */
usrSchema.index({
    usrnm: 1
}, {
    unique: true
}, {
    name: "usrs_usrnm_uq_indx"
});
/**
 * [email description]
 *
 * @type {[type]}
 */
usrSchema.index({
    email: 1
}, {
    unique: true
}, {
    name: "usrs_email_uq_indx"
});
/**
 * [lang description]
 *
 * @type {number}
 */
usrSchema.index({
    usrnm: 1,
    email: 1,
    name: 1
}, {
    name: "usrs_cp_indx"
});
//
module.exports = usrSchema;