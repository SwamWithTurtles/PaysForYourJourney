var mastercardGateway = require('../gateway/mastercardGateway');
var _ = require('lodash');

module.exports.populateTflData = function(journeys, callback) {

    _.forEach(journeys, function(j) {
        _.forEach(j.steps, function(step) {
            step.offers = ["10% off at TM Lewin"]
        })
    })

    mastercardGateway.getData(function(opportunities) {
        _.forEach(journeys, function(j) {
            _.forEach(j.steps, function(step) {
                step.offers = ["Stop off at " + opportunities.Response.Items[0].Merchant.Name + "? " + opportunities.Response.Items[0].Headline]
            })
        })


        callback(journeys);
    })

};
