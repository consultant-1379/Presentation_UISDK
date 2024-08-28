define([
    'Titan',
    'template!./List.html',
    'styles!./List.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});