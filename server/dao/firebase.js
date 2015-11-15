var Firebase = require('firebase');
var Guid = require('guid');

var myFirebaseRef = new Firebase("https://blinding-heat-2968.firebaseio.com/");



var writeTodo = function(todo) {
    var guid = Guid.raw();
    var emptyObj = {};
    emptyObj[guid] = todo;
    console.log(emptyObj);
    myFirebaseRef.update(
        emptyObj
    )
};

module.exports.writeTodo = writeTodo;
