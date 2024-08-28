define([
    'Titan',
    './WelcomeView',
    'example02/common/widget/Widget'
], function (Titan, View, Widget) {

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            var widget = new Widget();
            widget.start(this.view['placeholder']);
        },

        home: function () {
            console.log('Welcome.home');
        }

    });

});