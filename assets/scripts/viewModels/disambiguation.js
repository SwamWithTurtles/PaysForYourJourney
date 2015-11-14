define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function(ko, _, $, q) {
    var locFrom = ko.observable(q('loc_from'));
    var locTo = ko.observable(q('loc_to'));

    var locFromLat = ko.observable();
    var locFromLon = ko.observable();
    var locToLon = ko.observable();
    var locToLat = ko.observable();

    var waitingForData = ko.observable(true);

    var locFromDisambig = ko.observableArray();
    var locToDisambig = ko.observableArray();

    var locToAmbiguous = ko.observable(true);
    var locFromAmbiguous = ko.observable(true);

    var locToKnown = ko.observable(true);
    var locFromKnown = ko.observable(true);

    var ambiguityResolved = ko.computed(function() {
        return !locToAmbiguous() && !locFromAmbiguous()
    });

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
                        locFromLat(option.lat);
                        locFromLon(option.lon);
                    }
                });

                locFromDisambig(data.from.options);
            }

            if(data.dest.ambig) {
                _.forEach(data.dest.options, function(option) {
                    option.click = function() {
                        locTo(option.name);
                        locToLat(option.lat);
                        locToLon(option.lon);
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

        ambiguityResolved: ambiguityResolved,

        link: ko.computed(function() {
           return "/journey?from=" + locFrom() + "&to=" + locTo();
        }),

        route: ko.computed(function() {
            waitingForData(true);
            if(locFrom() && locTo()) {
                getRoutes()
            }
        }),


        mapLink: ko.computed(function() {
            if(ambiguityResolved())
            {
                return "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAz9Y8MnpsC3FLlzjpDPRnZEp07Wvs_O3A"
                    + "&origin=" + locFrom().replace(" ", "+")   //+ locFromLat() + "," + locFromLon()
                    + "&destination=" + locTo().replace(" ","+") //+ locToLat() + "," + locToLon()
                    + "&mode=transit";

            }
        })
    };
});
