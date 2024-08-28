define(['Titan'], function (Titan) {

    describe("Titan.Presenter", function () {

        it("1 Check that Titan.Presenter is defined", function () {
            expect(Titan.Presenter).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.Presenter", function () {
            var presenter = new Titan.Presenter({});
            expect(presenter.init).toBeDefined();
            expect(presenter.start).toBeDefined();
            expect(presenter.stop).toBeDefined();
        });

        it("3 Check that presenter options are applied to new instance of Titan.Presenter", function () {
            var View = Titan.View.extend({});
            var Model = Titan.Model.extend({});
            var Collection = Titan.Collection.extend({});

            var Presenter = Titan.Presenter.extend({
                View: View,
                showSomething: function () {
                    console.log("3 showSomethong()");
                }
            });

            var presenter = new Presenter({
                view: new View(),
                model: new Model(),
                collection: new Collection(),
                eventBus: new Titan.EventBus(),
                anotherOption: "somethingElse"
            });

            expect(presenter.view instanceof Titan.View).toBe(true);
            expect(presenter.model instanceof Titan.Model).toBe(true);
            expect(presenter.collection instanceof Titan.Collection).toBe(true);
            expect(presenter.eventBus instanceof Titan.EventBus).toBe(true);

            expect(presenter.View).toBeDefined();
            expect(presenter.showSomething).toBeDefined();

            expect(presenter.anotherOption).toBeUndefined();
        });

    });

});