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

require(["ko", "jquery","layout"], function(ko, $, _layout ) {

    var viewModel = {
        hello: ko.observable()
    };

    $.getJSON("/api/sample", function(data) {
        viewModel.hello(data.hello);
    });

    ko.applyBindings(viewModel);

});
