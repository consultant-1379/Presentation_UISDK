define(['Titan'], function (Titan) {

    describe("Titan.View", function () {

        it("1 Check that Titan.View is defined", function () {
            expect(Titan.View).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.View", function () {
            var view = new Titan.View({});
            expect(view.template).toBeDefined();
            expect(view.render).toBeDefined();
            expect(view.init).toBeDefined();
            expect(view.setPresenter).toBeDefined();
            expect(view.getPresenter).toBeDefined();
        });

        it("3.1 Check execution of methods from new instance of Titan.View", function () {
            var view = new Titan.View({});

            expect(view.template()).toBe("<div></div>");

            var presenter = new Titan.Presenter({});
            expect(view.setPresenter(presenter)).toBe(view);
            expect(view.getPresenter()).toBe(presenter);
        });

        it("3.2 Check that render() method replace element but not append new one", function () {
            var htmlFirst = 'Hello';
            var htmlSecond = 'Hi';

            var View = Titan.View.extend({
                template: function (context) {
                    if (context.secondTemplate) {
                        return '<div>' + htmlSecond + '</div>';
                    } else {
                        return '<div>' + htmlFirst + '</div>';
                    }
                }
            });

            var view = new View();
            expect(view.__view__.$el.length).toBe(1);
            expect(view.__view__.$el.html()).toBe(htmlFirst);

            view.render();
            view.render();
            expect(view.__view__.$el.length).toBe(1);
            expect(view.__view__.$el.html()).toBe(htmlFirst);

            view.secondTemplate = true;
            view.render();
            expect(view.__view__.$el.length).toBe(1);
            expect(view.__view__.$el.html()).toBe(htmlSecond);
        });

        it("3.2 ...", function () {
            var htmlFirst = 'Hello';
            var color = 'rgb(255, 0, 0)';

            var View = Titan.View.extend({
                template: function (context) {
                    return '<div class="Widget">' + htmlFirst + '</div>';
                },
                styles: '.Widget { color: ' + color + ' }'
            });

            var view = new View();
            view.__view__.$el.appendTo('#testElementId');
            var currentColor = window.getComputedStyle(view.__view__.$el[0], null).getPropertyValue('color');
            expect(currentColor).toBe(color);
        });

        it("3.3 Check that initialize() method adds new styles and get elements by [data-name] attribute", function () {
            var Widget = Titan.View.extend({
                template: function (context) {
                    return '<div>Widget</div>';
                }
            });
            define('Widget', ['Titan'], function (Titan) {
                return Widget;
            });

            var ViewWithPlaceholder = Titan.View.extend({
                template: function (context) {
                    return "<div>Test <div data-name='placeholder'></div></div>";
                }
            });
            var viewWithPlaceholder = new ViewWithPlaceholder();
            expect(viewWithPlaceholder['placeholder'] instanceof Titan.Element).toBe(true);

            var ViewWithWidget = Titan.View.extend({
                template: function (context) {
                    return "<div>Test <div data-name='widget' data-widget='Widget'></div></div>";
                }
            });
            var viewWithWidget = new ViewWithWidget();
            expect(viewWithWidget['widget'] instanceof Widget).toBe(true);
        });
    });

});