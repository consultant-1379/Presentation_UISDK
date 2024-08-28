define(['Titan'], function (Titan) {

    describe("Titan.EventBus", function () {

        it("1 Check that Titan.EventBus is defined", function () {
            expect(Titan.EventBus).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.EventBus which extended from Backbone.Events", function () {
            var eventBus = new Titan.EventBus();
            expect(eventBus.on).toBeDefined();
            expect(eventBus.off).toBeDefined();
            expect(eventBus.trigger).toBeDefined();
        });

    });

});