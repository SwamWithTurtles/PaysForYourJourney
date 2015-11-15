var mastercardGateway = require('../gateway/mastercardGateway');
var _ = require('lodash');

var latLongDistanceCalculator = require('../util/latLongDistanceCalculator');

module.exports.populateTflData = function(journeys, callback) {

    _.forEach(journeys, function(j) {
        _.forEach(j.steps, function(step) {
            step.offers = ["10% off at TM Lewin"]
        })
    })

    mastercardGateway.getData(function(opportunities) {
        _.forEach(journeys, function(j) {
            _.forEach(j.steps, function(step) {

                var closeOffers = _.filter(opportunities.Response.Items, function(item) {
                    var locationData = item.Merchant.Addresses;

                    return latLongDistanceCalculator.calculateDistance(
                        {lat: locationData.Latitude, lon: locationData.Longitude},
                        {lat: step.latitude, lon: step.longitude}
                    ) < 750;
                });

                step.offers = _.map(closeOffers, function(offer) {return ["Stop off at " + offer.Merchant.Name + "? " + offer.Headline]})
            })
        })


        callback(journeys);
    })

};
