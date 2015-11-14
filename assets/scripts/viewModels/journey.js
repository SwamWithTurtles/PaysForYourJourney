define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {
    var locFrom = ko.observable(q('from'));
    var locTo = ko.observable(q('to'));

    var journeys = ko.observableArray();

    var waitingForData = ko.observable(true);

    var getRoutes = function() {$.getJSON('/tfl/journey?locFrom=' + locFrom() + '&locTo=' + locTo(),
        function(data) {
            journeys(data);
            waitingForData(false);
        });
    };

    return {
        journey: {
            from: locFrom,
            to: locTo,
        },

        journeys: journeys,

        route: ko.computed(function() {
            waitingForData(true);
            if(locFrom() && locTo()) {
                getRoutes()
            }
        }),

        waitingForData: waitingForData
    }
});
