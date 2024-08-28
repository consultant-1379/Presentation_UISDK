define(['Titan'], function (Titan) {

    describe("Global space", function () {

        it("Must not be present in global space [$, jQuery, _, Backbone]", function () {
            expect($).toBeUndefined();
            expect(jQuery).toBeUndefined();
            expect(_).toBeUndefined();
            expect(Backbone).toBeUndefined();
        });

        it('Must be present in global space [require]', function () {
            expect(require).toBeDefined();
        });

    });

});
