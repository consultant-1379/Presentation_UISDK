define([
    'Titan',
    'template!./MyComponent.html',
    'styles!./MyComponent.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});
