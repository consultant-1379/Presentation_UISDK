define([
    'Titan',
    'template!./Settings.html',
    'styles!./Settings.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});