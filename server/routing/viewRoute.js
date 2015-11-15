var setUp = function(app) {
    app.get('/', function(request, response, next) {
        response.render('index');
    });

    app.get('/disambiguation', function(request, response, next) {
        response.render('disambiguation');
    });

    app.get('/addItem', function(request, response, next) {
        response.render('addItem');
    });

    app.get('/journey', function(request, response, next) {
        response.render('journey');
    });
};

module.exports.setUp = setUp;
