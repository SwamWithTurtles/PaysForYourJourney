define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {
    var locFrom = ko.observable(q('from'));
    var locTo = ko.observable(q('to'));

    var journeys = ko.observableArray();

    var waitingForData = ko.observable(true);

    var populatePageWithRoutes = function(data) {
        _.forEach(data, function (journey) {
            journey.visible = ko.observable(false);

            journey.click = function () {
                if (journey.visible()) {
                    journey.visible(false);
                    return;
                }

                _.forEach(data, function (j) {
                    j.visible(false);
                });

                journey.visible(true);
            };

            _.forEach(journey.steps, function (step) {
                step.offersExpanded = ko.observable(false);

                step.expandOffers = function () {
                    step.offersExpanded(true);
                }
            })


        })

        _.forEach(data, function (d) {
            journeys.push(d)
        });
    };

    (function() {$.getJSON('/tfl/journey?locFrom=' + locFrom() + '&locTo=' + locTo(),
        function(data) {
            populatePageWithRoutes(data);
            waitingForData(false);
        });
    })();

    (function() {$.getJSON('/tfl/detours?locFrom=' + locFrom() + '&locTo=' + locTo(),
        function(data) {
            populatePageWithRoutes(data);
            waitingForData(false);
        });
    })();

    return {
        journey: {
            from: locFrom,
            to: locTo
        },

        journeys: journeys,

        sortedJourneys: ko.computed(function() {

            return _.sortBy(journeys(), function(j) {return j.duration});
        }),

        waitingForData: waitingForData
    }
});
