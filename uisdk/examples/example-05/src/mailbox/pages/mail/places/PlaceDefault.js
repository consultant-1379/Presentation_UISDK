define([
    'Titan',
    './../Mail'
], function (Titan, Mail) {

    return Titan.Place.extend({
        name: 'Default',
        pattern: 'mailbox',
        Presenter: Mail,
        fn: 'showInbox',
        default: true
    });

});