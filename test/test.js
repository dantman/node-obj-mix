/* global describe, it */
// jshint expr: true
"use strict";
var expect = require('chai').expect,
	objMix = require('../');

describe("objMix", function() {
	var mixed = {},
		fn = function() {},
		obj = {},
		desc = { value: "foo", writable: true },
		unwritable = { value: "foo", writable: false },
		unenumerable = { value: "foo", enumerable: false },
		unconfigurable = { value: "foo", configurable: false },
		getter = { get: function() { return "foo"; } };

	objMix(mixed, {
		method: fn,
		prop: "foo",
		descriptor: desc,
		unwritable: unwritable,
		unenumerable: unenumerable,
		unconfigurable: unconfigurable,
		getter: getter,
		obj: obj
	});

	it('should set functions on the object as methods', function() {
		expect(mixed).to.have.a.property('method')
			.that.is.a("function")
			.that.equals(fn);
	});

	it('should support plain properties', function() {
		expect(mixed).to.have.a.property('prop')
			.that.is.a('string')
			.that.equals("foo");
	});

	it('should use defineProperty for things that look like property descriptors', function() {
		expect(mixed).to.have.a.property('descriptor')
			.that.is.a('string')
			.that.equals("foo");
	});

	it('should support property descriptors with writable: false', function() {
		expect(mixed).to.have.a.property('unwritable')
			.that.is.a('string')
			.that.equals("foo");

		expect(Object.getOwnPropertyDescriptor(mixed, 'unwritable'))
			.to.have.a.property('writable')
				.that.is.false;
	});

	it('should support property descriptors with enumerable: false', function() {
		expect(mixed).to.have.a.property('unenumerable')
			.that.is.a('string')
			.that.equals("foo");

		expect(Object.getOwnPropertyDescriptor(mixed, 'unenumerable'))
			.to.have.a.property('enumerable')
				.that.is.false;
	});

	it('should support property descriptors with configurable: false', function() {
		expect(mixed).to.have.a.property('unconfigurable')
			.that.is.a('string')
			.that.equals("foo");

		expect(Object.getOwnPropertyDescriptor(mixed, 'unconfigurable'))
			.to.have.a.property('configurable')
				.that.is.false;
	});

	it('should support getters', function() {
		expect(mixed).to.have.a.property('getter')
			.that.is.a('string')
			.that.equals("foo");

		expect(Object.getOwnPropertyDescriptor(mixed, 'getter'))
			.to.have.a.property('get')
				.that.is.a('function')
				.that.equals(getter.get);
	});

	it('should not treat plain objects as getters', function() {
		expect(mixed).to.have.a.property('obj')
			.that.is.a('object')
			.that.equals(obj);
	});
});
