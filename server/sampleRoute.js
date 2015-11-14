app.get('/', function(request, response, next) {
    response.send({
        hello: "World"
    });
});
