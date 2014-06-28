var basic = require('nodeBundle').basic().init();
var basic_model_frame = require('./basic_model.js');
var di;

var db;

var collections = [];


function attach (options) {
    var di_cont = this;
    this._mongo_basic_model = get_collection;
    this._mongo_get_basic_model = get_basic_model;
    this._mongo_db = db;
}

function init(next){
    console.log('basic.model init');
    di = this;
    db = this.__mongo.connect(this.__mongo.__data.con.str);
    return next();
}

basic   .set('init', init)
        .set('attach', attach)
        .addExports(['_mongo_basic_model', '_mongo_get_basic_model'])
        ;

//console.log(basic.getBundle());

function get_collection(m_c_name){

    if(collections[m_c_name] === undefined){
        var tmp = db.collection(m_c_name);
        collections[m_c_name] = basic_model_frame(tmp);

        console.log(' get model for ' + m_c_name);
    }

    return collections[m_c_name];
}

function get_basic_model(m_c_name){
    var model = get_collection(m_c_name);
    return model;
}


module.exports = basic.getBundle();