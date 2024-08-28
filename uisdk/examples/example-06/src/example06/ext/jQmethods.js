define(['Titan'],
    function (Titan) {
        // example, it overrides already defined  'text', 'html' and add 'remove' method
        Titan.extension(function () {
            Titan.Element.jQMethods(['text', 'html', "remove"]);

        });

    });