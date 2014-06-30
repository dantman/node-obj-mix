# obj-mix

  [![NPM version](https://badge.fury.io/js/obj-mix.svg)](http://badge.fury.io/js/obj-mix)
  [![Build Status](https://travis-ci.org/dantman/node-obj-mix.svg?branch=develop)](https://travis-ci.org/dantman/node-obj-mix)
  [![devDependencies](https://david-dm.org/dantman/node-obj-mix/dev-status.svg)](https://david-dm.org/dantman/node-obj-mix#info=devDependencies)


**objMix** is a simple utility that lets you merge methods, simple properties, and property descriptors into an object.

I've embraced JavaScript's prototypal nature and hate high-level class systems that try to turn JavaScript into something it is not. However I do like to simplify setting methods and properties onto a prototype. Up to now I've simply been using lodash's `_.merge` to do this. However I've recently been using getters in some node based projects. And while I can define these with `Object.defineProperties` it separates the definition of related properties and methods from each other.

objMix is a solution to that problem, call it with a base object such as a prototype and another object. objMix will merge functions and simple properties from the other object into that base object and use `Object.defineProperty` for anything that looks like a property descriptor.

```javascript
var objMix = require('obj-mix');

function Foo() {
	// This is Foo
}

objMix(Foo.prototype, {
	bar: function() {
		return "This is a method.";
	},
	baz: "This is a property.",
	qux: {
		get: function() {
			return "This is a property with a getter.";
		}
	}
});

var foo = new Foo();
console.log(foo.bar()); // "This is a method.";
console.log(foo.baz); // "This is a property.";
console.log(foo.qux); // "This is a property with a getter.";
```
