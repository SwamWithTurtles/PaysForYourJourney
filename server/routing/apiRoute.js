var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');
var wishListData = require('../../data/wishList');

var _ = require('lodash');

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

    app.get('/firebase/test', function(req, res) {
        var write = require('../dao/firebase');
        write.writeTodo("silly");
    })

    app.get('/tfl/journey', function(req, res) {
        var data = tflGateway.getData(req.query['locFrom'], req.query['locTo'], function(error, response, body) {
            var journeys = tflDataParser.parseJourney(body);

            var journey = _.sortBy(journeys, function(j) {return j.duration})[0];
            journey.title = "Direct";

            mastercardDataParser.populateTflData([journey], res.send.bind(res));
        });
    });

    app.get('/wishlist/wishes', function(req,res) {

        var data = wishListData();

        res.send(data);
    });

    app.get('/tfl/detours', function(req, res) {
        mastercardDataParser.detourJourneys(req.query['locFrom'], req.query['locTo'], function(body) {
            var journeys = mastercardDataParser.populateTflData(body, res.send.bind(res));

        });
    });



};

module.exports.setUp = setUp;
