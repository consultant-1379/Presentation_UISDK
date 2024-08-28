define([
    'Titan',
    './MessageView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View();
            this.view.setPresenter(this);
        },

        setText: function (id) {
            this.view['idValue'].text(id)
        }

    });

});