var builder = require('nodeBundle').basicBundleBuilder();

var basic = builder.init();

function attach(){
    
}

basic.set('attach', attach);

module.exports = basic.getBundle();
