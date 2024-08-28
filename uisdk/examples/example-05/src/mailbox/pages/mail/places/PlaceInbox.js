define([
    'Titan',
    './../Mail'
], function (Titan, Mail) {

    return Titan.Place.extend({
        name: 'Inbox',
        pattern: 'mailbox/inbox',
        Presenter: Mail,
        fn: 'showInbox'
    });

});