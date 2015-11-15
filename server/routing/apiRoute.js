var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');
var wishListData = require('../../data/wishList');

var mastercardDataParser = require('../bl/mastercardDataParser');

var setUp = function(app) {
    app.get('/api/sample', function (request, response) {
        response.send({
            hello: "World"
        });
    });

    app.get('/tfl/routes', function(req, res) {
        var data = tflGateway.getData(req.query['locFrom'], req.query['locTo'], function(error, response, body) {
            res.send(
                tflDataParser.parsePlaces(body)
            )
        });
    });

    app.get('/tfl/journey', function(req, res) {
        var data = tflGateway.getData(req.query['locFrom'], req.query['locTo'], function(error, response, body) {
            var journeys = tflDataParser.parseJourney(body);
            mastercardDataParser.populateTflData(journeys, res.send.bind(res));
        });
    });

    app.get('/wishlist/wishes', function(req,res) {

        var data = wishListData();

        res.send(data);
    });
    
    app.get('/tfl/detours', function(req, res) {
        mastercardDataParser.detourJourneys(req.query['locFrom'], req.query['locTo'], res.send.bind(res));
    });

};

module.exports.setUp = setUp;
