//var utils = require('./utils');

var builder = require('nodeBundle').basicBundleBuilder();

var express;
var expressApp;

var __initVars = function(options){
    if(options.express === undefined){
        express = require('express');
    }else{
        express = options.express;
    }
    if(options.expressApp === undefined){
        expressApp = express();
    }else{
        expressApp = options.expressApp;
    }
};


function attach (options) {
    var di_cont = this;

    __initVars(options);

    this.__kernel = {
        getExpressApp: function () {
            return expressApp;
        },
        run: function(port){

            if(port === undefined) port = 80;
            expressApp.listen(port);
            console.log('Listenning port '+port);
        }
    };

}

var basic = builder.init('kernelBundle');

basic.set('attach', attach)
        .addExports(['__kernel']);

module.exports = basic.getBundle();