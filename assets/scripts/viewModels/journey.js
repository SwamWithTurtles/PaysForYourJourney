define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {
    var locFrom = ko.observable(q('from'));
    var locTo = ko.observable(q('to'));

    var journeys = ko.observableArray();

    var waitingForData = ko.observable(true);

    var getRoutes = function() {$.getJSON('/tfl/journey?locFrom=' + locFrom() + '&locTo=' + locTo(),
        function(data) {
            _.forEach(data, function(journey) {
                journey.visible = ko.observable(false);

                journey.click = function() {
                    if(journey.visible()) {
                        journey.visible(false);
                        return;
                    }

                    _.forEach(data, function(j) {
                        j.visible(false);
                    });

                    journey.visible(true);
                };

                _.forEach(journey.steps, function(step) {
                    step.offersExpanded = ko.observable(false);

                    step.expandOffers = function() {
                        step.offersExpanded(true);
                    }
                })


            });

            journeys(data);

            waitingForData(false);
        });
    };

    return {
        journey: {
            from: locFrom,
            to: locTo
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
