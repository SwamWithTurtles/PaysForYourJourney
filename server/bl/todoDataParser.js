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
                parsedJourney.title = "via " + todoLoc;
                parsedJourney.duration = easiestJourney1.duration + easiestJourney2.duration;
                answers.push(parsedJourney);
            });
        });

        Q.all(promises).then(function() {
            console.log("AAA", answers);
            callback(answers)
        });
    });
};
