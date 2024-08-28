define([
    'Titan',
    'template!./Welcome.html',
    'styles!./Welcome.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});