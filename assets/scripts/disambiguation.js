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


require(["ko", "viewModels/disambiguation", "jquery"], function(ko, destVM, $) {
    ko.applyBindings(destVM);
});
