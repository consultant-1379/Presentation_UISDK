define([
    'Titan',
    './MailView',
    'mailbox/common/list/List',
    'mailbox/common/message/Message',
    'mailbox/common/sidebar/Sidebar'
], function (Titan, View, List, Message, Sidebar) {

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            this.list = new List();
            this.message = new Message();

            this.sidebar = new Sidebar();
            this.sidebar.start(this.view['sidebar']);
        },

        showInbox: function () {
            this.sidebar.setSelectedFolder('inbox');
            this.list.start(this.view['container']);
        },

        showSent: function () {
            this.sidebar.setSelectedFolder('sent');
            this.list.start(this.view['container']);
        },

        showTrash: function () {
            this.sidebar.setSelectedFolder('trash');
            this.list.start(this.view['container']);
        },

        showMessage: function (place) {
            this.message.setText(place.id);
            this.message.start(this.view['container']);
        }

    });

});