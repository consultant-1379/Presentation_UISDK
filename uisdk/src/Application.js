/**
 * Encapsulates the entire Application. Eliminates the need to manually create an Element, Router and
 * MainController, and begin tracking of the hash value on the router. Triggers the initialisation of the whole app.
 *
 * @class Titan.Application
 * @constructor
 * @param options {Object}
 */
var Application = Titan.Application = function (options) {
    if (!options) {
        options = {};
    }

    this.eventBus = options.eventBus || new Titan.EventBus();
    if (options.container instanceof Titan.Element) {
        this.container = options.container;
    } else {
        var $el = $(options.container);
        this.container = new Titan.Element($el);
    }
};

Application.extend = Utils_extend;

Application.prototype = {

    /**
     * Creates a new Router and MainController with the EventBus, places and container for the application, and
     * begins tracking changes to the route.
     *
     * @method start
     */
    start: function (options) {
        /*
         var router,
         mainController;*/

        this.router = new Titan.Router({
            eventBus: this.eventBus,
            places: this.places,
            silent: options && options.silent
        });

        //noinspection JSUnusedAssignment
        this.mainController = new Titan.MainController({
            container: this.container,
            eventBus: this.eventBus
        });
        this.router.handleCurrentState();
    },
    stop: function () {
        if (this.mainController !== undefined) {
            this.mainController.stop();
            delete this.mainController;
            this.router.stopCurrentState();
        }
    }

};
