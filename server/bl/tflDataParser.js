var _ = require('lodash');

var extractPlaces = function(options) {
    var toDisambigOptions = options ? options.disambiguationOptions : [];

    var toDisambig = _.map(toDisambigOptions, function(option) {
        return {name: option.place.commonName }
    });

    return toDisambig;
}

module.exports.parse = function(data) {
    var data = JSON.parse(data);

    var toLocationDisambiguation = extractPlaces(data.toLocationDisambiguation);
    var fromLocationDisambiguation = extractPlaces(data.fromLocationDisambiguation);

    return {
        from: {
            ambig: true,
            options: fromLocationDisambiguation
        },
        dest: {
            ambig: true,
            options: toLocationDisambiguation
        }
    }
}
