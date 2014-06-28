var _ = require("lodash");

var methodStr = 'get,post,put,delete';

var __routes = {};

module.exports = {
    
    getRoutesFromNBSettings: function(settings){
        var ret = {};
        for(i in settings){
            var set = settings[i];
            if(set['__routes'] !== undefined){
                ret = _.assign(ret, set['__routes']);
            }
        }
        __routes = ret;
        return ret;
    },
    
    setRoutesToExpressApp: function(app, nbRoutes){
        for(i in nbRoutes){
            if (!nbRoutes.hasOwnProperty(i)) continue;
            var route = nbRoutes[i];
            if(route['fn'] !== undefined && typeof(route['fn']) === 'function'){
                var type = route.type || ['get'];
                if(typeof(type) !== 'object') type = [type];
                for(j in type){
                    var rtype = type[j];
                    if(methodStr.indexOf(rtype) !== -1){

                        app[rtype](i, route['fn']);
                    }
                }
            }
        }
        return;
    },
    
    setMidlewares: function(app, fnArr){
        for(i in fnArr){            
            var fun = fnArr[i];
            if(typeof(fun) === 'function'){
                app.use(fun);
            }else{
                var express = require('express');                
                if(express[fun] !== undefined){
                    app.use( express[fun]() );
                }
            }
        }
    },
    
    getDefaultPostRoutes: function(options, routes, defaults){
        var defPost = options.useDefaultPostRoutes || true;
        if(defPost === true){
            return _.union(defaults, routes);
        }
        
        return routes;
            
    },
    
    getStdPostRoutes: function(){
        return [
                    function(req, res){ res.end('404');  }
                ];
    }
};