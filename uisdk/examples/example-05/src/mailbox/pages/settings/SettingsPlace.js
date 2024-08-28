define([
    'Titan',
    './Settings'
], function (Titan, Settings) {

    return Titan.Place.extend({
        name: 'Settings',
        pattern: 'mailbox/settings',
        Presenter: Settings,
        fn: 'showSettings'
    });

});