var mastercardGateway = require('../gateway/mastercardGateway');
var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');

var _ = require('lodash');
var Q = require('q');

var latLongDistanceCalculator = require('../util/latLongDistanceCalculator');

module.exports.populateTflData = function (journeys, callback) {
    mastercardGateway.getData(function (opportunities) {
        _.forEach(journeys, function (j) {
            _.forEach(j.steps, function (step) {

                var closeOffers = _.filter(opportunities.Response.Items, function (item) {
                    var locationData = item.Merchant.Addresses;

                    return latLongDistanceCalculator.calculateDistance(
                            {lat: locationData.Latitude, lon: locationData.Longitude},
                            {lat: step.latitude, lon: step.longitude}
                        ) < 750;
                });

                step.offers = _.map(closeOffers, function (offer) {
                    return ["Stop off at " + offer.Merchant.Name + "? " + offer.Headline]
                });
            });


        });

        journeys = _.sortBy(journeys, function(j) {return j.duration;});

        callback(journeys);
    });

};

module.exports.rawDeals = function(callback) {
    mastercardGateway.getData(function(opportunities) {
        callback(opportunities.Response.Items);
    });
}

module.exports.detourJourneys = function (from, to, callback) {
    mastercardGateway.getData(function (opportunities) {

        var answers = [];

        var promises = _.map(opportunities.Response.Items, (function(opp) {
            return tflGateway.getDataVia(from, to, opp, function (leg1, leg2) {
                var parsedJourney1 = tflDataParser.parseJourney(leg1);
                var parsedJourney2 = tflDataParser.parseJourney(leg2);
                var easiestJourney1 = _.min(parsedJourney1, function(c) {return c.duration;});
                var easiestJourney2 = _.min(parsedJourney2, function(c) {return c.duration;});

                var parsedJourney = {};
                parsedJourney.steps = _.union(easiestJourney1.steps, easiestJourney2.steps);
                parsedJourney.headline = opp.Headline;
                parsedJourney.title = "via " + opp.Merchant.Name;
                parsedJourney.duration = easiestJourney1.duration + easiestJourney2.duration;
                answers.push(parsedJourney);
            });
        }));


        Q.all(promises).then(function() {
            callback(answers)
        });

    });
};
