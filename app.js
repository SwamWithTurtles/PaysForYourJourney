'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'assets/views/layouts/',
        partialsDir: 'assets/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/assets/views');

    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));
    app.use('images/', express.static(__dirname + '/dist/assets/images/'));
    app.use('scripts', express.static(__dirname + '/dist/assets/scripts/'));
    app.use('styles', express.static(__dirname + '/dist/assets/styles'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'assets/views/layouts/',
        partialsDir: 'assets/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/assets/views');

    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */
// Index Page
var apiRoutes = require('./server/routing/apiRoute.js');
apiRoutes.setUp(app);

var viewRoutes = require('./server/routing/viewRoute.js');
viewRoutes.setUp(app);


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
