define(['Titan'], function (Titan) {

    describe("Titan.Application", function () {

        it("1 Check that Titan.Application is defined", function () {
            expect(Titan.Application).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.Application", function () {
            var app = new Titan.Application();
            expect(app.start).toBeDefined();
        });

        it("3.1 Check that eventBus and container are created with undefined options", function () {
            var app = new Titan.Application();
            expect(app.eventBus instanceof Titan.EventBus).toBe(true);
            expect(app.container instanceof Titan.Element).toBe(true);
        });

        it("3.2 Check that eventBus and container are created with empty options", function () {
            var app = new Titan.Application({});
            expect(app.eventBus instanceof Titan.EventBus).toBe(true);
            expect(app.container instanceof Titan.Element).toBe(true);
        });

        it("3.3 Check eventBus and container with provided options", function () {
            var eventBus = new Titan.EventBus();

            var options = {
                container: '#Container',
                eventBus: eventBus
            };
            var app = new Titan.Application(options);

            expect(app.eventBus).toBe(eventBus);
            expect(app.eventBus instanceof Titan.EventBus).toBe(true);
            expect(app.container instanceof Titan.Element).toBe(true);
        });

        it("4.1 Check that same instances of eventBus are used but different Titan.Element are created", function () {
            var eventBus = new Titan.EventBus();
            var container = '#Container';

            var app1 = new Titan.Application({
                container: container,
                eventBus: eventBus
            });

            var app2 = new Titan.Application({
                container: container,
                eventBus: eventBus
            });

            expect(app1.eventBus).toBe(eventBus);
            expect(app1.eventBus).toBe(app2.eventBus);

            expect(app1.container instanceof Titan.Element).toBe(true);
            expect(app2.container instanceof Titan.Element).toBe(true);
            expect(app1.container).not.toBe(app2.container);
        });

        it("4.2 Test that different instances of eventBus are created", function () {
            var app1 = new Titan.Application();
            var app2 = new Titan.Application();

            expect(app2.eventBus).not.toBe(app1.eventBus);
        });

        it("5.1 Check that Titan.Application can not start because of exception", function () {
            var app = new Titan.Application();
            expect(function () {
                app.start()
            }).toThrow('Cannot create Router without places');
        });

        it("5.2 Check that Titan.Application successfully started up", function () {
            var View = Titan.View.extend({
                template: function () {
                    return '<div>' + Math.random() + '</div>'
                }
            });
            var MyPresenter = Titan.Presenter.extend({
                View: View
            });
            var MyPlace = Titan.Place.extend({
                name: 'welcome',
                pattern: '',
                Presenter: MyPresenter,
                fn: 'default'
            });

            var places = [MyPlace];

            var container = new Titan.Element('<div>test</div>');
            var MyApplication = Titan.Application.extend({
                places: places
            });

            var app = new MyApplication({
                container: container
            });
            expect(app.eventBus instanceof Titan.EventBus).toBe(true);
            expect(app.container instanceof Titan.Element).toBe(true);
            expect(function () {
                app.start()
            }).not.toThrow('');
        });

    });
});








