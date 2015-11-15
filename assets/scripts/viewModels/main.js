define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {

    var testVar = ko.observable('TEST VAR');

    var wishes = ko.observableArray();

    var waitingForData = ko.observable(true);

    var getWishes = function() {$.getJSON('/todo/list',
        function(data) {
            var formattedData = _.map(data.items, function(d) {return d[1]});
            wishes(formattedData);
            console.log(formattedData);
            waitingForData(false);
        });
    };

    getWishes();

    return {

        testVar: testVar,

        items: wishes,

        waitingForData: waitingForData

    }

});
