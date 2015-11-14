define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {
    var locFrom = ko.observable(q('loc_from'));
    var locTo = ko.observable(q('loc_to'));

    var waitingForData = ko.observable(true);
    var ambiguityResolved = ko.observable(false);

    var locFromDisambig = ko.observableArray();
    var locToDisambig = ko.observableArray();

    var locToAmbiguous = ko.observable(true);
    var locFromAmbiguous = ko.observable(true);

    var locToKnown = ko.observable(true);
    var locFromKnown = ko.observable(true);

    var getRoutes = function() {$.getJSON('/tfl/routes?locFrom=' + locFrom() + '&locTo=' + locTo(),
        function(data) {

            locFromKnown(data.from.known);
            locToKnown(data.dest.known);

            locFromAmbiguous(data.from.ambig);
            locToAmbiguous(data.dest.ambig);

            if(data.from.ambig) {
                _.forEach(data.from.options, function(option) {
                    option.click = function() {
                        locFrom(option.name);
                    }
                });

                locFromDisambig(data.from.options);
            }

            if(data.dest.ambig) {
                _.forEach(data.dest.options, function(option) {
                    option.click = function() {
                        locTo(option.name);
                    }
                });


                locToDisambig(data.dest.options);
            }

            waitingForData(false);
        });
    };

    return {
        locFrom: locFrom,
        locTo: locTo,

        locFromAmbiguous: locFromAmbiguous,
        locFromOptions: locFromDisambig,

        logToAmbiguous: locToAmbiguous,
        logToOptions: locToDisambig,

        locToKnown: locToKnown,
        locFromKnown: locFromKnown,

        waitingForData: waitingForData,

        route: ko.computed(function() {
            waitingForData(true);
            if(locFrom() && locTo()) {
                getRoutes()
            }
        })
    };
});
