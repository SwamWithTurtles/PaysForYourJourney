var setUp = function(app) {
    app.get('/', function(request, response, next) {
        response.render('index');
    });

    app.get('/destination', function(request, response, next) {
        response.render('destination');
    });
};

module.exports.setUp = setUp;
