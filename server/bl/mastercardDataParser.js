var mastercardGateway = require('../gateway/mastercardGateway');
var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');

var _ = require('lodash');
var Q = require('q');

var latLongDistanceCalculator = require('../util/latLongDistanceCalculator');

module.exports.populateTflData = function (journeys, callback) {
    mastercardGateway.getData(function (opportunities) {
        _.forEach(journeys, function (j) {

            _.forEach(opportunities.Response.Items, function(item) {
                var locationData = item.Merchant.Addresses;

                console.log("a")
                var closeEnoughSteps = _.filter(j.steps, function(step) {
                    var x = latLongDistanceCalculator.calculateDistance(
                        {lat: locationData.Latitude, lon: locationData.Longitude},
                        {lat: step.latitude, lon: step.longitude}
                    );
                    return x < 750;
                });

                console.log("b")

                if(closeEnoughSteps.length) {
                    console.log("b2")
                    var luckyStep = _.sortBy(closeEnoughSteps, function (step) {
                        return latLongDistanceCalculator.calculateDistance(
                            {lat: locationData.Latitude, lon: locationData.Longitude},
                            {lat: step.latitude, lon: step.longitude}
                        );
                    })[0];

                    console.log("b3", "Stop off at " + item[1].Merchant.Name + "? " + item[1].Headline)

                    if(!luckyStep.offers) {luckyStep.offers = [];}

                    console.log("b4", luckyStep)

                    luckyStep.offers.push(
                        {
                            name: "Stop off at " + item[1].Merchant.Name + "? " + item[1].Headline,
                            isMastercard: true
                        });

                    console.log("c")
                }
                console.log("d")
            });

            _.forEach(j.steps, function(step) {
                if (!step.offers) {
                    step.offers = [];
                }
            });



            /*_.forEach(j.steps, function (step) {

                var closeOffers = _.filter(opportunities.Response.Items, function (item) {
                    var locationData = item.Merchant.Addresses;

                    return latLongDistanceCalculator.calculateDistance(
                            {lat: locationData.Latitude, lon: locationData.Longitude},
                            {lat: step.latitude, lon: step.longitude}
                        ) < 750;
                });

                _.forEach(_.map(closeOffers, function (offer) {
                    return {name: "Stop off at " + offer.Merchant.Name + "? " + offer.Headline, isMastercard: true}
                }), function (closeOffer) {
                    closeOffer.isMastercard = true;
                    if (!step.offers) {
                        step.offers = [];
                    }
                    step.offers.push(closeOffer)
                });

                if (!step.offers) {
                    step.offers = [];
                }
            });*/


        });

        journeys = _.sortBy(journeys, function (j) {
            return j.duration;
        });

        callback(journeys);
    });

};

module.exports.rawDeals = function (callback) {
    mastercardGateway.getData(function (opportunities) {
        callback(opportunities.Response.Items);
    });
}

module.exports.detourJourneys = function (from, to, callback) {
    mastercardGateway.getData(function (opportunities) {

        var answers = [];

        var promises = _.map(opportunities.Response.Items, (function (opp) {
            return tflGateway.getDataVia(from, to, opp, function (leg1, leg2) {
                var parsedJourney1 = tflDataParser.parseJourney(leg1);
                var parsedJourney2 = tflDataParser.parseJourney(leg2);
                var easiestJourney1 = _.min(parsedJourney1, function (c) {
                    return c.duration;
                });
                var easiestJourney2 = _.min(parsedJourney2, function (c) {
                    return c.duration;
                });

                var parsedJourney = {};
                parsedJourney.steps = _.union(easiestJourney1.steps, easiestJourney2.steps);
                parsedJourney.headline = opp.Headline;
                parsedJourney.title = "via " + opp.Merchant.Name;
                parsedJourney.duration = easiestJourney1.duration + easiestJourney2.duration;
                answers.push(parsedJourney);
            });
        }));


        Q.all(promises).then(function () {
            callback(answers)
        });

    });
};
