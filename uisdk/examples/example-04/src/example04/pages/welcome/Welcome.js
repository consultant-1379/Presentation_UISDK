define([
    'Titan',
    './widget/Widget',
    './WelcomeView',
    'i18n!nls/dictionary'
], function (Titan, Widget, View, dictionary) {

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            var widget = new Widget({
                model: new Titan.Model(dictionary)
            });
            this.view['placeholder'].setWidget(widget);
        },

        home: function () {
            console.log(dictionary);
        }

    });

});