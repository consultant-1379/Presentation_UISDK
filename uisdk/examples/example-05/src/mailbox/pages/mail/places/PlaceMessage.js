define([
    'Titan',
    './../Mail'
], function (Titan, Mail) {

    return Titan.Place.extend({
        name: 'Message',
        pattern: 'mailbox/message/:id',
        Presenter: Mail,
        fn: 'showMessage',
        init: function (id) {
            this.id = id
        }
    });

});