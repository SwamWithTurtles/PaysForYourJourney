var mastercardGateway = require('../gateway/mastercardGateway');
var _ = require('lodash');

module.exports.populateTflData = function(journeys, callback) {

    mastercardGateway.getData(function(opportunities) {
        callback(journeys);
    })

};
