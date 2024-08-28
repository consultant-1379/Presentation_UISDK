define([
    'Titan',
    'template!./MyPage.html',
    'styles!./MyPage.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});
