var Firebase = require('firebase');
var Guid = require('guid');

var _ = require('lodash');

var myFirebaseRef = new Firebase("https://blinding-heat-2968.firebaseio.com/");

var writeTodo = function(todo) {
    var guid = Guid.raw();
    var emptyObj = {};
    emptyObj[guid] = todo;
    myFirebaseRef.update(
        emptyObj
    )
};

var read = function(callback) {
    myFirebaseRef.once("value", function(snapshot) {
        var data = snapshot.val();
        callback({items: _.pairs(data)});
    });
};

var deleteItem = function(id) {
    var foo = myFirebaseRef.child(id);
    foo.remove();
}

module.exports.writeTodo = writeTodo;
module.exports.listTodos = read;
module.exports.delete = deleteItem;
