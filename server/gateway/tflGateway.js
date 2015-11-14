var tflApiUri = function(from, to) {
    return "https://api.tfl.gov.uk/Journey/JourneyResults/"+ from.replace("/", "") +"/to/" + to.replace("/", "") +"?nationalSearch=False&timeIs=Departing&journeyPreference=LeastTime&walkingSpeed=Average&cyclePreference=None&alternativeCycle=False&alternativeWalking=True&applyHtmlMarkup=False&useMultiModalCall=False&app_id=&app_key="
};

var request = require('request');

module.exports.getData = function(locFrom, locTo, callback) {
    console.log(tflApiUri(locFrom, locTo))
    request(tflApiUri(locFrom, locTo), callback);
}
