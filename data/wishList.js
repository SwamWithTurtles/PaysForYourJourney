fs = require('fs');

var wishListData = function() {

    console.log('Trying to read file');

    fs.readFile('./data/wishList.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        console.log('No error - sending data');

        var retData = JSON.parse(data);

        console.log(retData);

        return(retData);
    });

    //return({
    //    "WishList": [
    //        {
    //            "ItemDesc": "Buy a shirt",
    //            "SomethingElse": "123"
    //        },
    //        {
    //            "ItemDesc": "Go to the bank",
    //            "SomethingElse": "123"
    //        }
    //    ]
    //});

}

module.exports = wishListData;
