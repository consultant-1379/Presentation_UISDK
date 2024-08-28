/**
 * A set of utility functions exposed by Titan
 *
 * @class Titan.utils
 */
Titan.utils = {

    /**
     * If args is a collection, it will be converted to an Array. If an index is specified, only items from that
     * index onwards will be in the returned Array.
     *
     * @method getListFromArguments
     * @param args {Array}
     * @param index {Integer}
     * @return {Array}
     */
    getListFromArguments: function (args, index) {
        var list = _.toArray(args);
        return index ? list.slice(index) : list;
    }

};
