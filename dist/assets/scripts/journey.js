require.config({
    paths: {
        'jquery': "../bower_components/jquery/dist/jquery.min",
        'ko': "../bower_components/knockout/dist/knockout",
        'lodash': "../bower_components/lodash/lodash.min"
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    }
});


require(["ko", "viewModels/journey", "jquery", "layout"], function(ko, journeyVM, $, _layout) {
    ko.applyBindings(journeyVM);
});
