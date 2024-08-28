// Implementation for Function.prototype.bind that is available in Safari only since version 5.1.4
// See for description and implementation: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
// See for compatibility matrix: http://kangax.github.com/es5-compat-table/
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            FNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof FNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        FNOP.prototype = this.prototype;
        fBound.prototype = new FNOP();

        return fBound;
    };
}

/**
 * Remove libraries from global space
 *
 */
var $ = window.$.noConflict(),
    _ = window._.noConflict(),
    Backbone = window.Backbone.noConflict(),
    Handlebars = window.Handlebars,
    _private={},
    Titan;

window.jQuery = undefined;

// TODO: check noConflict functionality in all base library.
// TODO: remove Handlebars and less from global




//noinspection JSUnusedAssignment
/**
 * The overall object exposed to require/almond. Contains all public objects within it.
 *
 * @module Titan
 */
Titan = {};

