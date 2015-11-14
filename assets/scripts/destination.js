require.config({
    paths: {
        'jquery': "../bower_components/jquery/dist/jquery.min",
        'ko': "../bower_components/knockout/dist/knockout"
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    }
});


require(["ko", "viewModels/destination", "jquery"], function(ko, destVM, $) {
    ko.applyBindings(destVM);
});