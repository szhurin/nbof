var url = require('url');
//---------------------------------------------------------
var basic = require('nodeBundle').basic().init();
var di;
var eol = '\n\r';
var tab = '         ';
//var mdbr;

function init(next){
    console.log('_sys init');
    di = this;
    //mdbr = this.__mongo.connect(this.__mongo.__data.con.str);
     return next();
};

console.log('partner start');
//console.log(basic.getBundle());
basic
        .set('init', init)
        .addRoutes( {'/_sys_check_routes': {
                                            fn: sys_check_routes
                                        }
                    });
 //console.log(basic.getBundle());
function sys_check_routes(req, res) {
    var app = di.__kernel.getExpressApp();
    var str = '';
    var routes = app.routes;

    var get = routes['get'];
    if(get !== undefined){
        str += 'GET = '+eol;
        for(i in get){
            var r = get[i];
            str += tab+r['path']+eol;
        }
    }


    var post = routes['post'];
    if(post !== undefined){
        str += eol+'POST = '+eol;
        for(i in post){
            var r = post[i];
            str += tab+r['path']+eol;
        }
    }

	res.end(str);


//res.end('test');
};

module.exports = basic.getBundle();