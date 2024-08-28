/**
 * Fix for Backbone.History.
 *
 * From Backbone.js:
 * Attempt to load the current URL fragment. If a route succeeds with a
 * match, returns true. If no defined routes matches the fragment,
 * returns false.
 *
 * @class Backbone.History
 * @method loadUrl
 * @param fragmentOverride {String} Optional parameter to override the current fragment with another
 * @return {Boolean} Whether or not a matching route exists for the current fragment.
 */
Backbone.History.prototype.loadUrl = function (fragmentOverride) {
    var fragment = this.fragment = this.getFragment(fragmentOverride),
        matched = false;
    _.any(this.handlers, function (handler) {
        if (handler.route.test(fragment)) {
            handler.callback(fragment);
            matched = true;
        }
    });
    return matched;
};

// Reset handlers on History.stop
Backbone.History.prototype.stop = function() {
    $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
    window.clearInterval(this._checkUrlInterval);
    Backbone.History.started = false;
    this.handlers=[];
};
