/**
 * Extends Backbone.Events.
 * See: [http://backbonejs.org/#Events](http://backbonejs.org/#Events)
 * Note: The bind and unbind method aliases have been made unavailable.
 *
 * @class Titan.EventBus
 * @constructor
 */
var EventBus = Titan.EventBus = function () {

};

['on', 'off', 'trigger'].forEach(function (fn) {
    Titan.EventBus.prototype[fn] = function () {
        Backbone.Events[fn].apply(this, arguments);
    };
});
