//route test , test_route
requireLoc = require('require-local');
var disp = requireLoc('lib/dispatch');
var module_name = 'tindex_test';

var settings = {
    __bundle_file: __filename,
    
    __services : {
        __rewrite: false,
        imports: [],
        exports: ['hello']
    },
    
    __nb:{
        __routes : {
            '/test1': {
                type: ['get'],
                fn: function(req, res){res.end('tytytyty')}
            },
            '/test1/route':{
                type: ['get'],
                fn: disp.defRouterText('app/test', 'route')

            }
        }
    }    
};




module.exports = {
    
    //name: module_name,
   
    attach : function (options) {
        //console.log('attach hello');
        this.hello = function (world) {
            var tmp = options.delimiter || ".";
            //this.hellop(' hell ');
          console.log("Hello "+ world + tmp);
        };
    },
    
    detach : function (options) {
        console.log('detach hello');
        //other module with the same name is attached
    },

    init : function (done) {
        //console.log('init tindex hello');
        // This plugin doesn't require any initialization step.
        return done();
    },
      
    __settings: settings
};