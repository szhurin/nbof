//route index
//'use strict';
requireLoc = require('require-local');
var disp = requireLoc('lib/dispatch');

module.exports = {
    '/': {
        methodts : ['get'], // default type, you can pass 'post', 'update', 'delete, 'put'
        fn: disp.defRouterText('app/index', 'index')
    }
};
