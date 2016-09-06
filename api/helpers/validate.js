var validator = require('validator');
/**
 * [isValidData description]
 *
 * @method isValidData
 *
 * @param  {[type]}    data [description]
 *
 * @return {Boolean}   [description]
 */
function isValidData(data) {
	if (typeof data == 'undefined' || data === null || data === '' || data === "" || data.length === 0 || data === "") {
		return false;
	}
	return true;
}
/**
 * [isValidObjectID description]
 *
 * @method isValidObjectID
 *
 * @param  {[type]}        str [description]
 *
 * @return {Boolean}       [description]
 */
exports.isObjectID = function (str) {
	if (isValidData(str)) {
		str = str + '';
		if (validator.isAlphanumeric(str)) {
			var len = str.length;
			if (len == 12 || len == 24) {
				return /^[0-9a-fA-F]+$/.test(str);
			}
		}
	}
	return false;
};
/**
 * [isDate description]
 *
 * @method isDate
 *
 * @param  {[type]} date [description]
 *
 * @return {Boolean} [description]
 */
exports.isDate = function (date) {
	// yyyy-MM-dd'T'HH:mm:ss.SSSZ
	var is_valid = false,
		regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	if (isValidData(date)) {
		is_valid = date.length >= 20 && regex.test(date);
	}
	return is_valid;
};
/**
 * [isEmail description]
 *
 * @method isEmail
 *
 * @param  {[type]} email [description]
 *
 * @return {Boolean} [description]
 */
exports.isEmail = function (email) {
	if (isValidData(email)) {
		if (validator.isLength(email, 8, 64)) {
			return validator.isEmail(email);
		}
	}
	return false;
};
/**
 * [isUsrnm description]
 *
 * @method isUsrnm
 *
 * @param  {[type]} usrnm [description]
 *
 * @return {Boolean} [description]
 */
exports.isUsrnm = function (usrnm) {
	if (isValidData(usrnm)) {
		return validator.matches(usrnm, /^[a-zA-Z][a-zA-Z0-9\._\-]{3,14}?[a-zA-Z0-9]{0,2}$/);
	}
	return false;
};