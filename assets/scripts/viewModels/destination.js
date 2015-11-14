define(['ko', 'jquery', 'util/queryParamReader'], function(ko, $, q) {
    var locFrom = ko.observable(q('loc_from'));
    var locTo = ko.observable(q('loc_to'));

    var waitingForData = ko.observable(true);
    var ambiguityResolved = ko.observable(false);

    var locFromDisambig = ko.observableArray();
    var locToDisambig = ko.observableArray();

    var locToAmbiguous = ko.observable(true);
    var locFromAmbiguous = ko.observable(true);

    var getRoutes = function() {$.getJSON('/tfl/routes?locFrom=' + locFrom() + '&locTo=' + locTo(),
        function(data) {
            console.log(data);

            ambiguityResolved(!data.from.ambig && !data.dest.ambig);
            if(data.from.ambig) {
                locFromDisambig(data.from.options);
            }

            if(data.dest.ambig) {
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

        waitingForData: waitingForData,

        route: ko.computed(function() {
            waitingForData(true);
            getRoutes()
        })
    };
});
