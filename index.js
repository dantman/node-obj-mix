"use strict";
var object_toString = Object.prototype.toString;

module.exports = objMix;

function objMix(obj, mixin) {
	var key, val, isFunction, isObject, isDescriptor;
	for ( key in mixin ) {
		val = mixin[key];
		isFunction = typeof val === 'function' || object_toString.call(val) === '[object Function]';
		isObject = object_toString.call(val) === '[object Object]';
		isDescriptor = isObject && ( 'get' in val || 'writable' in val || 'enumerable' in val || 'configurable' in val );

		if ( isFunction ) {
			// Set methods/functions on the object
			obj[key] = val;
		} else if ( isDescriptor ) {
			// Use defineProperty for objects that look like descriptors
			Object.defineProperty(obj, key, val);
		} else {
			// Set other values as properties
			obj[key] = val;
		}
	}
}
