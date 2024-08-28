/**
 * Allows low level access to Titan in order to create extensions.
 * See {{tutorial url}} for instructions on how to create an extension.
 *
 * @method Titan.extension
 * @param fn {Function} An anonymous function that wraps extension logic. The first param in this function will give
 *                      access to $, _, and Backbone. This function also has direct access to Titan.
 */
Titan.extension = function (fn) {
    fn.call(this, {
        $: $,
        _: _,
        Backbone: Backbone,
        Handlebars: Handlebars,
        _private: _private
    });
};


var Names = _private.Names = {
    PlaceChangeEvent: 'PlaceChangeEvent'
};


var Utils_extend = _private.Utils_extend = Backbone.View.extend;


_private.Utils_configure = Utils_configure;
function Utils_configure(options, names) {
    if (this.options) {
        options = _.extend({}, this.options, options);
    }
    names.forEach(function (attr) {
        if (options[attr]) {
            this[attr] = options[attr];
        }
    }, this);
    this.options = options;
}


