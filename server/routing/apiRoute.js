var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');

var mastercardGateway = require('../gateway/mastercardGateway');
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
    })

    app.get('/tfl/journey', function(req, res) {
        var data = tflGateway.getData(req.query['locFrom'], req.query['locTo'], function(error, response, body) {
            res.send(
                tflDataParser.parseJourney(body)
            )
        });
    })

    app.get('/mastercard/offers', function(req, res) {
        var data = mastercardGateway.getData(function(data) {
            res.send(
                data
            );
        });
    })
};

module.exports.setUp = setUp;
