define([
    'Titan',
    './pages/places',
    './ext/extension'
], function (Titan, places) {

    return Titan.Application.extend({

        places: places

    });

});