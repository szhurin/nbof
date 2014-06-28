process.env.TZ = 'UTC' ;
// find . -name package.json -maxdepth 2 -execdir npm install \;
console.log('-------------------------------------------------------------------');
var nb = require('nodeBundle');

var options = {
    __mongo_data: {con: {str: 'mongodb://localhost:27017/test'}}
};

// cavent to have multiple levels of init in sys and app part of the program
nb.attach(['lib/bundles'], options); // system level bundles
                                     // could be framework bundles
nb.attach(['app'], options);         // application level bundles



var di = nb.getDI();

di.__router.addPreRoute('bodyParser');
//var settings = di.__router.register();

console.log('good');

//console.log(settings);
//console.log(di.__router.getApp().routes);
//console.log(di.__kernel.getExpressApp().routes);

di.__router.run(2000);
//


console.log('end ');