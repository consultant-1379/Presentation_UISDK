define([
    'Titan',
    'template!./Sidebar.html',
    'styles!./Sidebar.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});