var _ = require('lodash');

var extractPlaces = function(options) {
    var toDisambigOptions = options ? options.disambiguationOptions : [];

    var toDisambig = _.map(toDisambigOptions, function(option) {
        return {name: option.place.commonName,
                lat: option.place.lat,
                lon: option.place.lon }
    });

    return {
        known: options ? (options.matchStatus !== "notidentified") : true,
        ambig: options ? (options.matchStatus !== "identified") : false,
        options: toDisambig
    };
}

var nicelyFormatted = function(legs) {
    return _.map(legs, function(leg) {
        return {
            destination: leg.arrivalPoint.commonName,
            transport: (leg.routeOptions[0].name ? _.pluck(leg.routeOptions, 'name').join(" or ") : ""),
            mode: (leg.mode ? leg.mode.name : "Walk")
        };
    });
}

module.exports.parseJourney = function(dataString) {
    var data = JSON.parse(dataString);

    return _.sortBy(_.map(data.journeys, function(journey) {
        return {
            duration: journey.duration,
            steps: nicelyFormatted(journey.legs)
        }
    }), 'duration');
}

module.exports.parsePlaces = function(dataString) {
    var data = JSON.parse(dataString);

    return {
        from: extractPlaces(data.fromLocationDisambiguation),
        dest: extractPlaces(data.toLocationDisambiguation)
    }
}
