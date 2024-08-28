define(['Titan'], function (Titan) {

    describe("Titan.Router", function () {

        it("1 Check that Titan.Router is defined", function () {
            expect(Titan.Router).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.Router", function () {
            var router = new Titan.Router({
                eventBus: new Titan.EventBus(),
                places: []
            });
            expect(router.init).toBeDefined();
            expect(router.handleCurrentState).toBeDefined();
        });

        it("3.1 Check that exception is thrown if options is undefined", function () {
            expect(function () {
                new Titan.Router();
            }).toThrow('Cannot create Router without options');
        });

        it("3.2 Check that exception is thrown if options is empty", function () {
            expect(function () {
                new Titan.Router({});
            }).toThrow('Cannot create Router without eventBus');
        });

        it("3.3 Check that exception is thrown if options.container is undefined", function () {
            expect(function () {
                new Titan.Router({
                    eventBus: new Titan.EventBus()
                });
            }).toThrow('Cannot create Router without places');
        });

        it("4 Check that Titan.Router variables are defined correctly", function () {
            var eventBus = new Titan.EventBus();
            var places = [];

            var router = new Titan.Router({
                eventBus: eventBus,
                places: places
            });

            expect(router.eventBus).toBe(eventBus);
            expect(router.router).toBeDefined();
            expect(router.places).toBeUndefined();
        });

        it("5 Check that places are initiated with new instance of Titan.Router", function () {
            var Presenter1 = Titan.Presenter.extend({});
            var Place1 = Titan.Place.extend({
                name: "Place1",
                pattern: "pattern1",
                Presenter: Presenter1,
                fn: "callbackFunction1"
            });

            var Presenter2 = Titan.Presenter.extend({});
            var Place2 = Titan.Place.extend({
                name: "Place2",
                pattern: "pattern2",
                Presenter: Presenter2,
                fn: "callbackFunction2"
            });

            var eventBus = new Titan.EventBus();
            var places = [Place1, Place2];

            var router = new Titan.Router({
                eventBus: eventBus,
                places: places
            });

            expect(Presenter1.prototype.uid).not.toBe(Presenter2.prototype.uid);
        });

        it("6 Check that we can execute function Titan.Router.handleCurrentState()", function () {
            var eventBus = new Titan.EventBus();
            var places = {};

            var router = new Titan.Router({
                eventBus: eventBus,
                places: places
            });

            expect(function () {
                router.handleCurrentState()
            }).not.toThrow('');
        });

    });
});








