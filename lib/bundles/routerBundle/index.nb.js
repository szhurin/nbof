var utils = require('./utils');
var builder = require('nodeBundle').basicBundleBuilder();


var registered = false;
var preRoutes = [];
var postRoutes = [];
var nbRoutes = {};
var di_cont;


function attach(options) {
    di_cont = this;
    this.__router = {
        register: function(){
            register(options);
        },
        run: function(port) {
            register(options);
            di_cont.__kernel.run(port);
        },
        addPreRoute: function (fn) {
            preRoutes.push(fn);
        },
        replacePreRoutes: function (fns) {
            preRoutes = fns;
        },
        addPostRoute: function (fn) {
            postRoutes.push(fn);
        },
        replacePostRoutes: function (fns) {
            postRoutes = fns;
        }
    };
}


function register(options) {
    if(!registered){
        nbRoutes = utils.getRoutesFromNBSettings(di_cont.___nb.getBundlesSettings());

        var app = di_cont.__kernel.getExpressApp();
        //expressApp = app;
        utils.setMidlewares(app, preRoutes);

        utils.setRoutesToExpressApp(app, nbRoutes);

        postRoutes = utils.getDefaultPostRoutes(options, postRoutes, utils.getStdPostRoutes());
        utils.setMidlewares(app, postRoutes);

        registered = true;
    }

    return nbRoutes;
}


var basic = builder.init('routerBundle');

basic.set('attach', attach)
        .addImports(['__kernel'])
        .addExports(['__router']);

module.exports = basic.getBundle();
