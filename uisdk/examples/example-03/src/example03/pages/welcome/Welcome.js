define([
    'Titan',
    './widget/Widget',
    './WelcomeView'
], function (Titan, Widget, View) {

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            var widget = new Widget();
            this.view['placeholder'].setWidget(widget);
        },

        home: function () {
            Titan.console.log('Message from Welcome.home()');
        }

    });

});