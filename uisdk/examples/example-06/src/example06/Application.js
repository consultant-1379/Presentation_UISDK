define([
    'Titan',
    './pages/places',
    './ext/jQmethods'
], function (Titan, places) {

    return Titan.Application.extend({

        places: places

    });

});
