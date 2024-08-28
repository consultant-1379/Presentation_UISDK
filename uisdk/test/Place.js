define(['Titan'], function (Titan) {

    describe("Titan.Place", function () {

        it("1 Check that Titan.Place is defined", function () {
            expect(Titan.Place).toBeDefined();
        });

        it("2 Check existing methods from new instance of Titan.Place", function () {
            var place = new Titan.Place({});
            expect(place.init).toBeDefined();
            expect(place.getPresenter).toBeDefined();
            expect(place.getPresenterId).toBeDefined();
            expect(place.getFn).toBeDefined();
        });

        it("3 Check that arguments are applied to new instance of Titan.Place", function () {
            var Presenter = Titan.Presenter.extend({});
            var fn = 'callbackFunction';

            var uid = "uniqId";
            Presenter.prototype.uid = uid;

            var Place = Titan.Place.extend({
                Presenter: Presenter,
                fn: fn
            });
            var place = new Place();

            expect(place.getPresenter()).toBe(Presenter);
            expect(place.getPresenterId()).toBe(uid);
            expect(place.getFn()).toBe(fn);
        });

    });

});