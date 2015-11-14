var setUp = function(app) {
    app.get('/api/sample', function (request, response) {
        response.send({
            hello: "World"
        });
    });
};

module.exports.setUp = setUp;
