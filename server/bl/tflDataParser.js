var _ = require('lodash');

var extractPlaces = function(options) {
    var toDisambigOptions = options ? options.disambiguationOptions : [];

    var toDisambig = _.map(toDisambigOptions, function(option) {
        return {name: option.place.commonName }
    });

    return {
        known: options ? (options.matchStatus !== "notidentified") : true,
        ambig: options ? (options.matchStatus !== "identified") : false,
        options: toDisambig
    };
}

var nicelyFormatted = function(legs) {
    return _.map(legs, function(leg) {
        return (leg.routeOptions[0].name ? _.pluck(leg.routeOptions, 'name').join(" or ") : "Walk") + " to " + leg.arrivalPoint.commonName;
    }).join(", ");
}

module.exports.parseJourney = function(dataString) {
    var data = JSON.parse(dataString);

    return _.map(data.journeys, function(journey) {
        return {
            duration: journey.duration,
            steps: nicelyFormatted(journey.legs)
        }
    });
}

module.exports.parsePlaces = function(dataString) {
    var data = JSON.parse(dataString);

    return {
        from: extractPlaces(data.fromLocationDisambiguation),
        dest: extractPlaces(data.toLocationDisambiguation)
    }
}
