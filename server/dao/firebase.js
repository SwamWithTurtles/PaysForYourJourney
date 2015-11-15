var Firebase = require('firebase');
var Guid = require('guid');

var _ = require('lodash');

var myFirebaseRef = new Firebase("https://blinding-heat-2968.firebaseio.com/");

var writeTodo = function(todo) {
    var guid = Guid.raw();
    var emptyObj = {};
    emptyObj[guid] = {itemDesc: todo};
    console.log(emptyObj);
    myFirebaseRef.update(
        emptyObj
    )
};

var read = function(callback) {
    var lock = false;
    var data;
    myFirebaseRef.once("value", function(snapshot) {
        data = snapshot.val();
        callback({items: _.pairs(data)});
    });
};

module.exports.writeTodo = writeTodo;
module.exports.listTodos = read;
