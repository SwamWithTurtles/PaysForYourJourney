var tflGateway = require('../gateway/tflGateway');
var tflDataParser = require('../bl/tflDataParser');

var setUp = function(app) {
    app.get('/api/sample', function (request, response) {
        response.send({
            hello: "World"
        });
    });

    app.get('/tfl/routes', function(req, res) {
        var data = tflGateway.getData(req.params['locFrom'], req.param['locTo'], function(error, response, body) {
            res.send(
                tflDataParser.parse(body)
            )
        });
    })
};

module.exports.setUp = setUp;
