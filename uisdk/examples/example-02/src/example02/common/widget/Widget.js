define([
    'Titan',
    './WidgetView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View();
            this.view.setPresenter(this);
        }

    });

});