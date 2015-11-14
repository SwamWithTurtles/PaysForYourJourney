define(['ko', 'util/queryParamReader'], function(ko, q) {
    var locFrom = ko.observable(q('loc_from'));
    var locTo = ko.observable(q('loc_to'));
    
    return {
        locFrom: locFrom,
        locTo: locTo
    };
});
