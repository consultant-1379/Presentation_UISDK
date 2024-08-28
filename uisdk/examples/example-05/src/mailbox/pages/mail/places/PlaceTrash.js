define([
    'Titan',
    './../Mail'
], function (Titan, Mail) {

    return Titan.Place.extend({
        name: 'Trash',
        pattern: 'mailbox/trash',
        Presenter: Mail,
        fn: 'showTrash'
    });

});