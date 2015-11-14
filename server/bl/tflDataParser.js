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

module.exports.parse = function(dataString) {
    var data = JSON.parse(dataString);

    return {
        from: extractPlaces(data.fromLocationDisambiguation),
        dest: extractPlaces(data.toLocationDisambiguation)
    }
}
