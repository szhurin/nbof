var basic = require('nodeBundle').basic().init();
var mdbr;

basic   .set('attach', attach)
        .addExports(['__basic_parser']);

function attach(){
    this.__basic_parser = {
        parse_req: parse_req,
        alter_res: alter_res,
        check_pass: check_pass,
        set_header: set_header,
        process_res: function(req, res, check){
            var query = parse_req(req);
            return alter_res(query, req, res, check);
        },
        format_data: {
            eol: '\r\n',
            csv_delim: '";"'
        }

    };
}

function parse_req(req) {
    var url_parts = require('url').parse(req.url, true);
    var query = url_parts.query;
    return query;
}

function check_pass(query, req, res, pass_check, to_handle_wrong_pass){
    var pass = query.pass || req.body.pass || '_';

    var check = pass_check || '1233';
    var end_output = to_handle_wrong_pass || true;

    if(pass !== check)
    {
        if(end_output) {  res.end('wrong pass '+pass); }
        return false;
    }
    return true;
}

function set_header(query, req, res){
    var table = query.table || query.t || 0;
    var xml = query.xml || query.x || 0;

    if(table === '1')
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
    else{
        if(xml === '1'){
            res.setHeader('Content-Type', 'text/xml; charset=utf-8');
        }else
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }

    return query;
}

function alter_res(query, req, res, check){
    check_pass(query, req, res, check);
    set_header(query, req, res, check);
    return query;
}


module.exports = basic.getBundle();
