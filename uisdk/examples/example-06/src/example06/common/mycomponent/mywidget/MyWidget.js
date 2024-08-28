define([
    'Titan',
    'template!./MyWidget.html',
    'styles!./MyWidget.less'
], function (Titan, template, styles) {

    var Item = Titan.View.extend({

        styles: styles,

        template: template,

        init: function () {
            this.root.bind('click', this.changeModifier.bind(this))
        },

        changeModifier: function () {
            var state = this[Item.EL_LABEL].getModifier(Item.MOD_DISABLED);
            this[Item.EL_LABEL].addModifier(Item.MOD_DISABLED, !state);
            this[Item.EL_LABEL].text('disabled=' + !state);
        },

        setText: function (text) {
            this[Item.EL_LABEL].text(text);
        }

    }, {
        EL_LABEL: 'label',
        MOD_DISABLED: 'disabled'
    });

    return Item;

});
