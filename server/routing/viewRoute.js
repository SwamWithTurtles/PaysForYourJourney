var setUp = function(app) {
    app.get('/', function(request, response, next) {
        response.render('index');
    });
};

module.exports.setUp = setUp;
