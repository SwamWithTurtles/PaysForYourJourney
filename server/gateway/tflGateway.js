var Q = require('q');

var tflApiUri = function(from, to) {
    return "https://api.tfl.gov.uk/Journey/JourneyResults/"+ from.replace("/", "") +"/to/" + to.replace("/", "") +"?nationalSearch=False&timeIs=Departing&journeyPreference=LeastTime&walkingSpeed=Average&cyclePreference=None&alternativeCycle=False&alternativeWalking=True&applyHtmlMarkup=False&useMultiModalCall=False&app_id=&app_key="
};

var tflApiUriVia = function(from, to, via) {
    return "https://api.tfl.gov.uk/Journey/JourneyResults/"+ from.replace("/", "") +"/to/" + to.replace("/", "") +"?nationalSearch=False&timeIs=Departing&journeyPreference=LeastTime&walkingSpeed=Average&cyclePreference=None&alternativeCycle=False&alternativeWalking=True&applyHtmlMarkup=False&useMultiModalCall=False&via=" + via + "&app_id=&app_key=";
};

var request = require('request');

module.exports.getData = function(locFrom, locTo, callback) {
    console.log(tflApiUri(locFrom, locTo))
    request(tflApiUri(locFrom, locTo), callback);
}

module.exports.getDataVia = function(locFrom, locTo, via, callback) {
    var deferred  = Q.defer();

    var url = tflApiUri(locFrom, via.Merchant.Addresses.Latitude + "," + via.Merchant.Addresses.Longitude);
    var url2 = tflApiUri(via.Merchant.Addresses.Latitude + "," + via.Merchant.Addresses.Longitude, locTo);
    request(url, function(error, response, leg1) {

        request(url2, function(error, response, leg2) {
            callback(leg1, leg2);

            return deferred.resolve();
        });


    });

    return deferred.promise;
}

module.exports.getDataViaTodo = function(locFrom, locTo, via, callback) {
    var deferred  = Q.defer();


    var url = tflApiUri(locFrom, via);
    var url2 = tflApiUri(via, locTo);
    request(url, function(error, response, leg1) {

        request(url2, function(error, response, leg2) {
            callback(leg1, leg2);

            return deferred.resolve();
        });

    });

    return deferred.promise;
}
