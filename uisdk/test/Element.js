define(['Titan'], function (Titan) {

    describe('Titan.Element', function () {

        it('is defined', function () {
            expect(Titan.Element).toBeDefined();
        });

        var element = new Titan.Element(document);

        it('can be instantiated', function () {
            expect(element).toBeDefined();
            expect(element instanceof Titan.Element).toBeTruthy();
        });

        [
            'addWidget',
            'setWidget'
        ].forEach(function (fn) {
                it('provides defined API method ' + fn, function () {
                    expect(element[fn]).toBeDefined();
                    expect(element[fn]).toBeFunction();
                });
            });

    });

    var Widget = Titan.View.extend({
        template: function () {
            return '<div>' + Math.random() + '</div>'
        }
    });

    describe('addWidget()', function () {

        it('appends any count of Widgets to Element', function () {
            var element = new Titan.Element('<div></div>');
            element.addWidget(new Widget());
            element.addWidget(new Widget());
            expect(_private.Element_getRoot.call(element).children().length).toBe(2);
        });

    });

    describe('setWidget()', function () {

        it('replaces existing Widget(s) in Element', function () {
            var element = new Titan.Element('<div></div>');
            var first = new Widget();
            var second = new Widget();
            element.setWidget(first);
            element.setWidget(second);
            var root = _private.Element_getRoot.call(element);
            var viewRoot = _private.View_getRoot.call(second);
            expect(root.children().length).toBe(1);
            expect(root.children()[0]).toBe(viewRoot[0]);
        });

    });

});








