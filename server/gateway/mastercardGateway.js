mastercard = require('../../data/mastercardLoyaltyOffers');

module.exports.getData = function(callback) {
    console.log(mastercard);
    callback(mastercard);
};
