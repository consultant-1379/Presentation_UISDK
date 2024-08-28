define(['Titan'], function (Titan) {

    describe("Titan.MainController", function () {

        it("1 Check that Titan.MainController is defined", function () {
            expect(Titan.MainController).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.MainController", function () {
            var mainController = new Titan.MainController({
                eventBus: new Titan.EventBus(),
                container: new Titan.Element('<div></div>')
            });
            expect(mainController.onPlaceChange).toBeDefined();
        });

        it("3.1 Check that exception is thrown if options is undefined", function () {
            expect(function () {
                new Titan.MainController();
            }).toThrow('Cannot create MainController without options');
        });

        it("3.2 Check that exception is thrown if options is empty", function () {
            expect(function () {
                new Titan.MainController({});
            }).toThrow('Cannot create MainController without eventBus');
        });

        it("3.3 Check that exception is thrown if options.container is undefined", function () {
            expect(function () {
                new Titan.MainController({
                    eventBus: new Titan.EventBus()
                });
            }).toThrow('Cannot create MainController without container');
        });

        it("4 Check that class variables are correct", function () {
            var eventBus = new Titan.EventBus();
            var container = new Titan.Element('<div></div>');

            spyOn(eventBus, 'on');

            var mainController = new Titan.MainController({
                eventBus: eventBus,
                container: container
            });
            expect(eventBus.on).toHaveBeenCalled();

            expect(mainController.eventBus).toBe(eventBus);
            expect(mainController.container).toBe(container);
            expect(mainController.presenters).toEqual({});
        });

        it("5.1 Check that new Presenter created if not exist", function () {
            var eventBus = new Titan.EventBus();
            var container = new Titan.Element('<div></div>');

            var mainController = new Titan.MainController({
                eventBus: eventBus,
                container: container
            });

            expect(mainController.presenters).toEqual({});

            var Presenter = Titan.Presenter.extend({
                View: Titan.View.extend({}),

                showSomething: function () {
                    this.showSomethingPassed = true;        // TODO: check this value
                }
            });

            var Place = Titan.Place.extend({
                name: 'Presenter',
                pattern: '',
                Presenter: Presenter,
                fn: 'showSomething'
            });
            var place = new Place();

            var presenterId = "123";
            Presenter.prototype.uid = presenterId;

            mainController.onPlaceChange(place);
            expect(mainController.presenters).not.toEqual({});

            var presenter = mainController.presenters[presenterId];
            expect(presenter.eventBus).toBeDefined();
            expect(presenter.eventBus).toBe(eventBus);
            expect(presenter.view).toBeDefined();
        });

        it("5.2 Check that an exist Presenter will be taken when executed mainController.onPlaceChange(place)", function () {
            var eventBus = new Titan.EventBus();
            var container = new Titan.Element('<div></div>');

            var mainController = new Titan.MainController({
                eventBus: eventBus,
                container: container
            });

            var Presenter = Titan.Presenter.extend({
                View: Titan.View.extend({}),
                showSomething: function () {
                    this.showSomethingPassed = true;        // TODO: check this value
                }
            });

            var presenterId = "123";
            Presenter.prototype.uid = presenterId;

            var presenter = new Presenter({
                eventBus: eventBus,
                view: new Presenter.prototype.View()
            });
            mainController.presenters[presenterId] = presenter;

            expect(mainController.presenters).not.toEqual({});

            var Place = Titan.Place.extend({
                name: 'Presenter',
                pattern: '',
                Presenter: Presenter,
                fn: 'showSomething'
            });
            var place = new Place();

            mainController.onPlaceChange(place);
            expect(mainController.presenters).not.toEqual({});
            expect(mainController.presenters[presenterId]).toBe(presenter);
        });

        it("5.3 Check that new Presenter will be created if not exist in list", function () {
            var eventBus = new Titan.EventBus();
            var container = new Titan.Element('<div></div>');

            var mainController = new Titan.MainController({
                eventBus: eventBus,
                container: container
            });

            var Presenter1 = Titan.Presenter.extend({
                View: Titan.View.extend({}),
                showSomething: function () {
                    this.showSomethingPassed = true;        // TODO: check this value
                }
            });
            var presenter1Id = "123";
            Presenter1.prototype.uid = presenter1Id;

            var presenter = new Presenter1({
                eventBus: eventBus,
                view: new Presenter1.prototype.View()
            });
            mainController.presenters[presenter1Id] = presenter;

            expect(mainController.presenters).not.toEqual({});

            var Presenter2 = Titan.Presenter.extend({
                View: Titan.View.extend({}),
                showSomethingElse: function () {
                    this.showSomethingElsePassed = true;        // TODO: check this value
                }
            });

            var Place = Titan.Place.extend({
                name: 'Presenter2',
                pattern: '',
                Presenter: Presenter2,
                fn: 'showSomethingElse'
            });
            var place = new Place();

            var presenter2Id = "098";
            Presenter2.prototype.uid = presenter2Id;

            mainController.onPlaceChange(place);
            expect(mainController.presenters).not.toEqual({});
            expect(mainController.presenters[presenter1Id]).toBe(presenter);

            var presenter2 = mainController.presenters[presenter2Id];
            expect(presenter2).not.toBe(presenter);
            expect(presenter2 instanceof Titan.Presenter).toBe(true);

            expect(presenter2.eventBus).toBeDefined();
            expect(presenter2.eventBus).toBe(eventBus);
            expect(presenter2.view).toBeDefined();
        });

    });

});