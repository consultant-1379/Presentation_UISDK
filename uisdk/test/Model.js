define(['Titan'], function (Titan) {

    describe("Titan.Model", function () {

        it("1 Check that Titan.Model is defined", function () {
            expect(Titan.Model).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.Model which extended from Backbone.Model", function () {
            var model = new Titan.Model();

            // Backbone.Events
            expect(model.bind).toBeDefined();
            expect(model.unbind).toBeDefined();
            expect(model.trigger).toBeDefined();

            // Backbone.Model
            expect(model.get).toBeDefined();
            expect(model.set).toBeDefined();
            expect(model.has).toBeDefined();
            expect(model.toJSON).toBeDefined();
        });

    });

});