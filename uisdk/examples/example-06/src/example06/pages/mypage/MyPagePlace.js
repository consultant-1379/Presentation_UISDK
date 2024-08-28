define([
    'Titan',
    './MyPage'
], function (Titan, MyPage) {

    return Titan.Place.extend({
        name: 'Default',
        pattern: 'page',
        Presenter: MyPage,
        fn: 'main',
        defaultPlace: true
    });

});
