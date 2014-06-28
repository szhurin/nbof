var mongo = require('mongoskin');

//mdb = mongo.db('root:4321@localhost:27017/gw_test', {safe: true});
//var   mdb = mongo.db('root:gw1233@localhost:27017/getwear', {safe: true});
//var   mdbr = mongo.db('mongodb://heroku:6DCPqIku-uY3n1n5I8hD06F2DHyXn8BoEkSIpseKiW5OXORFQbQRJqioUr7oO-C6d38WwtxuExCu27_yYycVTA@dawson.mongohq.com:10015/app14888560', {safe: true});
//var   mdbr = mongo.db('mongodb://api:xcvbgDfhklj-DFG-893shdfSg67829345gfds67@dawson.mongohq.com:10015/app14888560', {safe: true});

var basic = require('nodeBundle').basic().init('sys.mongo_db');

var mConnections = {};

function connect(str){
    if(mConnections[str] !== undefined){ return mConnections[str]; }

    var tmp = mongo.db(str, {safe: true});
    mConnections[str] = tmp;
    return tmp;
}

function reconnect(str){
    delete mConnections[str];
    return connect(str);
}

function attach (options) {
    var di_cont = this;
    var data = options.__mongo_data || {};
    //console.log(['mongo', options]);
    this.__mongo = {
        connect: connect,
        reconnect: reconnect,
        __data: data
    };
}


basic.set('attach', attach)
        .addExports(['__mongo']);

module.exports = basic.getBundle();