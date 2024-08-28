define([
    'Titan',
    'template!./Widget.html',
    'styles!./Widget.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});