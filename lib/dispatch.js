// module lib/dispatch
var error = 'error';
var eol = '\r\n';
var requireLoc = require('require-local');
exports.geterror = function(){ return error;};

var mimeTypes = {
                    'txt': 'text/plain; charset=utf-8'
                    ,'text': 'text/plain; charset=utf-8'
                    ,'html': 'text/html; charset=utf-8'
                };


var basicRouter = function(mimeType){
        
    return function(module, method){
    if(!method) method = 'index';
    return function(req, res) {
            var gate = requireLoc(module);
            gate[method](req, function(text, data){
                if(!data) data = {};
                var type = mimeType;
                if(!data['type']){
                    if(!mimeTypes[data['type']]) type = mimeTypes[data['type']];
                    else{
                        if(typeof (data['type']) === 'string' ) type = data['type'];
                    }                        
                }
                res.setHeader('Content-Type', type);
                if(text === false) res.end(gate.geterror());
                else{
                    var output = '';
                    if(typeof(data['before']) === 'string') output += data['before']; 
                    output += text;
                    if(typeof(data['after']) === 'string') output += data['after'];                     
                    
                    res.end(output);
                }
            });
        };
    };
};


exports.defRouterText = basicRouter( mimeTypes['txt']);
exports.defRouterHtml = basicRouter( mimeTypes['html']);
