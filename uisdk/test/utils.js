define(['Titan'], function (Titan) {

    describe("Titan.utils", function () {

        it("1 Check that Titan.utils is defined", function () {
            expect(Titan.utils).toBeDefined();
        });

        it("2 Check that Titan.utils methods are defined", function () {
            expect(Titan.utils.getListFromArguments).toBeDefined();
        });

        it("3.1 Check that Titan.utils.getListFromArguments() method returns all values after 1 index", function () {
            var myArgs;
            (function () {
                myArgs = arguments;
            })(1, 2, 3);

            var result = Titan.utils.getListFromArguments(myArgs, 1);
            expect(result.length).toBe(2);
            expect(result).toEqual([2, 3]);
        });

        it("3.2 Check that Titan.utils.getListFromArguments() method doesnt throw exception if args are not populated", function () {
            var myArgs;
            (function () {
                myArgs = arguments;
            })();

            var result;
            expect(function () {
                result = Titan.utils.getListFromArguments(myArgs, 1);
            }).not.toThrow('');
            expect(result).toBeDefined();
            expect(result.length).toBe(0);
            expect(result).toEqual([]);
        });

        it("3.3 Check that Titan.utils.getListFromArguments() method doesnt throw exception if args length is less than index", function () {
            var myArgs;
            (function () {
                myArgs = arguments;
            })(1, 2);

            var result;
            expect(function () {
                result = Titan.utils.getListFromArguments(myArgs, 3);
            }).not.toThrow('');

            expect(result).toBeDefined();
            expect(result.length).toBe(0);
            expect(result).toEqual([]);
        });

        it("3.4 Check that Titan.utils.getListFromArguments() method doesnt throw exception if args param is undefined", function () {
            var result;
            expect(function () {
                result = Titan.utils.getListFromArguments(undefined, 1);
            }).not.toThrow('');

            expect(result).toBeDefined();
            expect(result.length).toBe(0);
            expect(result).toEqual([]);
        });

    });

});