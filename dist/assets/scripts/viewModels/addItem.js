define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function (ko, _, $, q) {

    var location = ko.observable(q("location"));
    var locKnown = ko.observable(true);

    var locAmbiguous = ko.observable(true);
    var locOptions = ko.observableArray();

    var locLat = ko.observable();
    var locLon = ko.observable();

    var loadData = function () {
        $.getJSON("/tfl/ambiguity?loc=" + location(), function (data) {
            locKnown(data.known);
            locAmbiguous(data.ambig);

            if(!locAmbiguous() && (!locLat() || !locLon())) {
                $.getJSON("/tfl/journey?locFrom=NW51TL&locTo=" + location(), function(journeyData) {

                    var destination = journeyData[0].steps[journeyData[0].steps.length - 1];
                    locLat(destination.latitude);
                    locLon(destination.longitude);

                })
            }

            _.forEach(data.options, function (option) {
                option.click = function () {
                    location(option.name);
                    locLat(option.lat);
                    locLon(option.lon);
                }
            });

            locOptions(data.options);
        })
    };

    loadData();

    location.subscribe(loadData);

    return {
        task: q("todo"),
        loc: location,
        locKnown: locKnown,
        locAmbiguous: locAmbiguous,
        locOptions: locOptions,
        onFormComplete: function() {
           $.ajax({
            url: "/todo/add",
            data: JSON.stringify({
                location: location(),
                itemDesc: q("todo"),
                lon: locLon(),
                lat: locLat()
            }),
            contentType: 'application/json',
            dataType: 'json',
            type: "POST"

        }).always(
            function(data) {
                window.location.replace("/");
            }
        ) }
    };
});
