define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {

    var testVar = ko.observable('TEST VAR');

    var wishes = ko.observableArray();

    var waitingForData = ko.observable(true);

    var getWishes = function() {$.getJSON('/wishlist/wishes',
        function(data) {

            wishes(data);

            console.log(wishes());

            testVar("AGH");

            waitingForData(false);
        });
    };

    getWishes();

    return {

        testVar: testVar,

        wishes: wishes,

        waitingForData: waitingForData

    }

});
