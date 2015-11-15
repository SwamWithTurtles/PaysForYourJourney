define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {

    var testVar = ko.observable('TEST VAR');

    var wishes = ko.observableArray();

    var waitingForData = ko.observable(true);

    var getWishes = function() {$.getJSON('/todo/list',
        function(data) {
            var formattedData = _.map(data.items, function(d) {
                var todo = d[1];
                todo.isMastercard = false;
                return todo;
            });
            _.forEach(formattedData, function(todo) {wishes.push(todo);});
            waitingForData(false);
        });
    };

    var getMastercard = function() {$.getJSON('/mastercard/offers', function(data) {
        var formattedData = _.map(data, function(d) {
            return {
                itemDesc: d.Headline,
                isMastercard: true
            };
        });

        _.forEach(formattedData, function(todo) {wishes.push(todo);});
        waitingForData(false);
    })}

    getWishes();
    getMastercard();

    return {

        testVar: testVar,

        items: wishes,

        waitingForData: waitingForData

    }

});
