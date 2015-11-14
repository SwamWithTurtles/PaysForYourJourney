require(["../bower_components/knockout/dist/knockout.js"], function(ko) {
    var viewModel = {
        hello: "World"
    };

    ko.applyBindings(viewModel);
});
