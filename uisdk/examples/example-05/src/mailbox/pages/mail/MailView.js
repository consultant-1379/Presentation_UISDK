define([
    'Titan',
    'template!./Mail.html',
    'styles!./Mail.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});