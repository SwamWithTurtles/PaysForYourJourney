fs = require('fs');

var wishListData = function() {
    fs.readFile('/data/wishList.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return(data);
    });
}

module.exports = wishListData;
