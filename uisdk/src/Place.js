/**
 * Maps a function from a Presenter to the corresponding URI.
 *
 * @class Titan.Place
 * @constructor
 * @param args {Array}
 */
var Place = Titan.Place = function (args) {
    this.args = args;
    this.init.call(this, args);

};

Place.extend = Utils_extend;


Place.prototype = {

    /**
     * Method called when Place is initialised. Empty by default, it can be overridden to provide functionality
     *
     * @method init
     */
    init: function () {


    },

    /**
     * Gets the Presenter associated with the Place
     *
     * @method getPresenter
     * @return {Titan.Presenter} Presenter
     */
    getPresenter: function () {
        return this.Presenter;
    },

    /**
     * Gets the ID of the Presenter associated with the Place
     *
     * @method getPresenterId
     * @return {String} UID of Presenter.
     */
    getPresenterId: function () {
        return this.Presenter.prototype.uid;
    },

    /**
     * Gets the name of the function in the Presenter to be called when the Place is changed to.
     *
     * @method getFn
     * @return {String} fn
     */
    getFn: function () {
        return this.fn;
    }

};
