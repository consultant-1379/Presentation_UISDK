/**
 * Binds the changes in Place to a method to handle the change using options.eventBus.
 * Throws error if options does not contain eventBus and container.
 *
 * @class Titan.MainController
 * @constructor
 * @param options {Object} Contains properties that are added to the MainController's options object.
 *                         Applies container directly to the MainController.
 */
// TODO: Could be removed from Titan globals
var MainController = Titan.MainController = function (options) {
    if (options === undefined) {
        throw new Error('Cannot create MainController without options');
    }
    if (options.eventBus === undefined) {
        throw new Error('Cannot create MainController without eventBus');
    }
    if (options.container === undefined) {
        throw new Error('Cannot create MainController without container');
    }

    this.eventBus = options.eventBus;
    this.eventBus.on(Names.PlaceChangeEvent, this.onPlaceChange, this);

    this.presenters = {};

    this.container = options.container;
};

MainController.prototype = {

    /**
     * Handles a change in the route, and triggers the corresponding event specified in the module
     *
     * @method onPlaceChange
     * @param place {Titan.Place} The Place object we wish to change to.
     */
    onPlaceChange: function (place) {
        var id = place.getPresenterId(),
            Presenter,
            View,
            view;
        if (!this.presenters[id]) {
            Presenter = place.getPresenter();
            View = Presenter.prototype.View;
            view = new View();
            this.presenters[id] = new Presenter({
                eventBus: this.eventBus,
                view: view
            });
            view.setPresenter(this.presenters[id]);
        }

        this.presenters[id].start(this.container);
        this.presenters[id][place.getFn()].call(this.presenters[id], place);
    },
    stop: function () {
        if (this.presenters !== undefined) {
            var container=this.container;
            var presenters= this.presenters;
            _.each(presenters, function (presenter, index) {
                presenter.stop(container);

                delete  presenters[index];
            });
            this.eventBus.off(Names.PlaceChangeEvent);
        }
    }

};
