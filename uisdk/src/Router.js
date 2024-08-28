/**
 * Creates a new Backbone Router and calls the init method.
 * Throws error if options does not contain eventBus and places.
 *
 * @class Titan.Router
 * @constructor
 * @param options {Object}
 */
var Router = Titan.Router = function (options) {

    if (!options) {
        throw new Error('Cannot create Router without options');
    }
    if (!options.eventBus) {
        throw new Error('Cannot create Router without eventBus');
    }
    if (!options.places) {
        throw new Error('Cannot create Router without places');
    }

    this.defaultPlaces = [];
    this.eventBus = options.eventBus;
    this.router = new Backbone.Router();
    this.silent = options.silent || false;
    this.init(options.places);
};

Router.prototype = {

    /**
     * Method called when Router is initialised. Adds all the routes to the Router for each Place.
     *
     * @method init
     * @param places {Array} An array of all places within an application to be bound to the router.
     */
    init: function (places) {

        _.each(places, function (Place) {

            // This is just for backwards compatibility
            //Will be removed in next version
            var Presenter = Place.prototype.Presenter;

            Presenter.prototype.uid = _.uniqueId('Presenter_');
            this.router.route(
                Place.prototype.pattern,
                Place.prototype.name,
                _.bind(this._placeHandler, this, Place)
            );
            //noinspection JSUnresolvedVariable
            if (!this.silent && Place.prototype.defaultPlace) {
                this.defaultPlaces.push(Place);

                if (Place.prototype.pattern !== '') {
                    this.router.route(
                        '',
                        Place.prototype.name,
                        _.bind(this._placeHandler, this, Place)
                    );
                }
            }
        }, this);
    },

    _placeHandler: function (Place) {

        var args = Titan.utils.getListFromArguments(arguments, 1),
            place = new Place(args);
        this.eventBus.trigger(Names.PlaceChangeEvent, place);
    },

    /**
     * Starts listening to the hashchange event and starts dispatching routes.
     *
     * @method handleCurrentState
     */
    handleCurrentState: function () {

        if (Backbone.History.started) {
            _.each(this.defaultPlaces, this._placeHandler, this);
        } else {
            Backbone.history.start();
        }
    },
    stopCurrentState:function(){
        Backbone.history.stop();
    }
};
