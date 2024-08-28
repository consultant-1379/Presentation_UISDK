define(['Titan'], function (Titan) {

    describe("Titan.extension", function () {

        it("1 Check that Titan.extension is defined", function () {
            expect(Titan.extension).toBeDefined();
        });

        it("2 ...", function () {
            Titan.extension(function(env) {

                expect(env.$).toBeDefined();
                expect(env._).toBeDefined();
                expect(env.Backbone).toBeDefined();
                expect(env.Handlebars).toBeDefined();

            });
        });

    });

});