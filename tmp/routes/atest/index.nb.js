//route test , test_route
requireLoc = require('require-local');
var disp = requireLoc('lib/dispatch');
var module_name = 'index_test';

var settings = {
    __bundle_file: __filename,
    
    __services : {
        __rewrite: true,
        imports: [],
        exports: ['hellou']
    },
    
    __nb:{
        __routes : {
            '/test': {
                type: ['get'],
                fn: disp.defRouterText('app/test')
            },
            '/test/route':{
                type: ['get'],
                fn: disp.defRouterText('app/test', 'route')

            }
        }
    }   
};

module.exports = {
    
    name: module_name,
    
        
   
    attach : function (options) {
        //console.log('attach hellou');
        this.hellou = function (world) {
            var tmp = options.delimiter || ".";
          console.log("Hellou "+ world + tmp);
        };
    },
    
    detach : function (options) {
        console.log('detach hellou');
        //other module with the same name is attached
    },

    init : function (done) {
        
        //console.log('init index hellou');
        // This plugin doesn't require any initialization step.
        return done();
    },
      
    __settings: settings
    
};