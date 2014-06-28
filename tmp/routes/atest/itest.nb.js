requireLoc = require('require-local');
var disp = requireLoc('lib/dispatch');
var module_name = '_test';

var settings = {
    __bundle_file: __filename,
    __services : {
        imports: ['hello'],
        exports: ['hellop']
    },
    __nb:{
        __routes : {
            '/': {
            type : ['get', 'post', 'put'], // default type, you can pass 'post', 'update', 'delete, 'put'
            fn: disp.defRouterText('app/index', 'index')
            }
        }
    }
};

module.exports = {
    
    name: module_name,
    
        
   
    attach : function (options) {
        //console.log('attach hellop');
        
        this.hellop = function (world) {
            var tmp = options.delimiter || ".";
            this.hello(' hell ');
          console.log("Hello -- "+ world + tmp);
        };
    },
    
    detach : function (options) {
        //other module with the same name is attached
    },

    init : function (done) {
        //console.log('init atest hellop');
        // This plugin doesn't require any initialization step.
        return done();
    },
      
    __settings: settings
};
