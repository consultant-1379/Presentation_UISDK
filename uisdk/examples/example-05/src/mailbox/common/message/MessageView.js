define([
    'Titan',
    'template!./Message.html',
    'styles!./Message.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});