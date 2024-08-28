define([
    'Titan',
    './SettingsView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View: View,

        showSettings: function () {
            console.log('Settings.showSettings()');
        }

    });

});