define([
    'Titan',
    './Welcome'
], function (Titan, Welcome) {

    return Titan.Place.extend({
        name: 'Default',
        pattern: '',
        Presenter: Welcome,
        fn: 'home'
    });

});