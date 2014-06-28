//route test , test_route
requireLoc = require('require-local');
var disp = requireLoc('lib/dispatch');

module.exports = {
    '/test': {
        methods: ['get'],
        fn: disp.defRouterText('app/test')
    },
    '/test/route':{
            methods: ['get'],
            fn: disp.defRouterText('app/test', 'route'),            
            restricted: true
        }
};