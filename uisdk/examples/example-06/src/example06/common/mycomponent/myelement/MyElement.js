define([
    'Titan'
], function (Titan) {

    return Titan.Element.extend({

        template: function () {
            return '<div>MyElement (click to remove)</div>';
        },

        init: function () {
            this.bind('click', this.doRemove.bind(this));
        },

        setText: function (text) {
            this.text('MyElement: ' + text + ' (click to remove)');
        },

        doRemove: function () {
            this.detach();
        }

    });

});
