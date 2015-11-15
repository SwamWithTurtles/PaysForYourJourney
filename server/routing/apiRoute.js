var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');

var todoDataParser = require('../bl/todoDataParser');

var bodyParser = require('body-parser')


var _ = require('lodash');

var mastercardDataParser = require('../bl/mastercardDataParser');

var setUp = function(app) {


    app.use(bodyParser.json());

    app.get('/mastercard/offers', function(req, res) {
        mastercardDataParser.rawDeals(res.send.bind(res));
    });

    app.get('/tfl/routes', function(req, res) {
        var data = tflGateway.getData(req.query['locFrom'], req.query['locTo'], function(error, response, body) {
            res.send(
                tflDataParser.parsePlaces(body)
            )
        });
    });

    app.get('/tfl/ambiguity', function(req, res) {
        var data = tflGateway.getData("NW51TL", req.query['loc'], function(error, response, body) {
            res.send(
                tflDataParser.parseAmbiguity(body)
            )
        })
    });

    app.post('/todo/add', function(req, res) {
        var write = require('../dao/firebase');
        write.writeTodo(req.body);

        res.statusCode = 200;
        res.end();
    });

    app.get('/todo/list', function(req, res) {
        var firebase = require('../dao/firebase');

        firebase.listTodos(res.send.bind(res));
    });

    app.get('/tfl/journey', function(req, res) {
        var data = tflGateway.getData(req.query['locFrom'], req.query['locTo'], function(error, response, body) {
            var journeys = tflDataParser.parseJourney(body);

            var journey = _.sortBy(journeys, function(j) {return j.duration})[0];
            journey.title = "Direct";

            mastercardDataParser.populateTflData([journey],
                function(x) {todoDataParser.populateTflData(x, res.send.bind(res))}
            );

        });
    });

    app.get('/tfl/detours', function(req, res) {
        mastercardDataParser.detourJourneys(req.query['locFrom'], req.query['locTo'], function(body) {
            mastercardDataParser.populateTflData(body,
                function(x) {todoDataParser.populateTflData(x, res.send.bind(res))}
            );
        });
    });

    app.get('/todo/detours', function(req, res) {
        todoDataParser.detourJourneys(req.query['locFrom'], req.query['locTo'], function(body) {
            mastercardDataParser.populateTflData(body,
                function(x) {todoDataParser.populateTflData(x, res.send.bind(res))}
            );
        });
    })


};

module.exports.setUp = setUp;
