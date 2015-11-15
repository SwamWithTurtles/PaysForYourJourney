define(['ko', 'lodash', 'jquery', 'util/queryParamReader'], function (ko, _, $, q) {

    var location = ko.observable(q("location"));
    var locKnown = ko.observable(true);

    var locAmbiguous = ko.observable(true);
    var locOptions = ko.observableArray();

    var loadData = function () {
        $.getJSON("/tfl/ambiguity?loc=" + location(), function (data) {
            locKnown(data.known);
            locAmbiguous(data.ambig);

            _.forEach(data.options, function (option) {
                option.click = function () {
                    location(option.name);
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
                itemDesc: q("todo")
            }),
            contentType: 'application/json',
            dataType: 'json',
            type: "POST"

        }).always(
            function(data) {
                console.log("asd");
                window.location.replace("/");
            }
        ) }
    };
});
