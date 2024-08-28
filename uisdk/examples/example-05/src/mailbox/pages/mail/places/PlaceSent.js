define([
    'Titan',
    './../Mail'
], function (Titan, Mail) {

    return Titan.Place.extend({
        name: 'Sent',
        pattern: 'mailbox/sent',
        Presenter: Mail,
        fn: 'showSent'
    });

});