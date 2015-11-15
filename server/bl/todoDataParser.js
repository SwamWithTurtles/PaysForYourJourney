var Firebase = require('../dao/firebase');
var tflDataParser = require('../bl/tflDataParser');
var tflGateway = require('../gateway/tflGateway');

var _ = require('lodash');
var Q = require('q');

var latLongDistanceCalculator = require('../util/latLongDistanceCalculator');

module.exports.detourJourneys = function (from, to, callback) {
    Firebase.listTodos(function(data) {
        var answers = [];


        var promises = _.map(data.items, function(todo) {
            var todoLoc = todo[1].location;
            var todoName = todo[1].itemDesc;

            return tflGateway.getDataViaTodo(from, to, todoLoc, function (leg1, leg2) {
                var parsedJourney1 = tflDataParser.parseJourney(leg1);
                var parsedJourney2 = tflDataParser.parseJourney(leg2);
                var easiestJourney1 = _.min(parsedJourney1, function(c) {return c.duration;});
                var easiestJourney2 = _.min(parsedJourney2, function(c) {return c.duration;});

                var parsedJourney = {};
                parsedJourney.steps = _.union(easiestJourney1.steps, easiestJourney2.steps);
                parsedJourney.headline = todoName;
                parsedJourney.title = '"' + todoName + '" via ' + todoLoc;
                parsedJourney.duration = easiestJourney1.duration + easiestJourney2.duration;
                answers.push(parsedJourney);
            });
        });

        Q.all(promises).then(function() {
            callback(answers)
        });
    });
};

module.exports.populateTflData = function (journeys, callback) {
    Firebase.listTodos(function (todoList) {
        var todos = todoList.items;
        _.forEach(journeys, function (j) {
            _.forEach(j.steps, function (step) {

                var closeOffers = _.filter(todos, function (item) {

                    var x = latLongDistanceCalculator.calculateDistance(
                            {lat: item[1].lat, lon: item[1].lon},
                            {lat: step.latitude, lon: step.longitude}
                        );
                    return x < 750;
                });

                _.forEach(_.map(closeOffers, function (item) {
                    return {name: "Stop off at " + item[1].location + "? " + item[1].itemDesc, isMastercard: false }
                }), function (closeOffer) {
                    closeOffer.isMastercard = false;
                    if (!step.offers) {
                        step.offers = [];
                    }
                    step.offers.push(closeOffer)
                });

                if (!step.offers) {
                    step.offers = [];
                }
            });

        });

        journeys = _.sortBy(journeys, function(j) {return j.duration;});

        callback(journeys);
    });

};
