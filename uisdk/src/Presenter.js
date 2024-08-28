/**
 * Connects the Model to the View
 *
 * @class Titan.Presenter
 * @constructor
 * @param options {Object} An option JavaScript object containing the EventBus and View
 */
var Presenter = Titan.Presenter = function (options) {

    Utils_configure.call(this, options || {}, ['model', 'collection', 'eventBus', 'view']);

    this.init();

    // this.test=this;

};

Presenter.extend = Utils_extend;

Presenter.prototype = {

    /**
     * Method called when Presenter is initialised. Empty by default, it can be overridden to provide functionality
     *
     * @method init
     */
    init: function () {
    },

    /**
     * Replaces the contents of the specified container with the current widget
     *
     * @method start
     * @param container {Titan.Element} The Element to place the widget within
     */
    start: function (container) {
        if (this.view) {
            var parent = View_getRoot.call(this.view).parent();
            if (parent.length === 0 || parent[0] !== Element_getRoot.call(container)[0]) {
                container.setWidget(this.view);
            }
        }
    },
    stop:function(container){
        if (this.view) {
            var parent = View_getRoot.call(this.view).parent();
            if (parent.length !== 0 || parent[0] !== Element_getRoot.call(container)[0]) {
                container.removeWidget(this.view);
            }
        }

    }

};
