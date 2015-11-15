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

require(["ko", "jquery", "layout", "viewModels/main"], function(ko, $, _layout, mainVM ) {

    //var viewModel = {
    //    hello: ko.observable()
    //};
    //
    //$.getJSON("/api/sample", function(data) {
    //    viewModel.hello(data.hello);
    //});

    ko.applyBindings(mainVM);

});
