module.exports = get_model;


function get_model(collection){

    return {
        collection: collection,

        update: get_update(collection),
        get: find(collection),
        find: find(collection),
        insert: get_insert(collection),
        remove: get_remove(collection)
    };
}


function get_insert(collection){
    return function(params){ // errFun, data, successFun
        if( params.data !== undefined &&
            typeof(params.data) === 'object'
           ){
            collection.insert(params.data, function(err, res) {
                if(err){
                    if(typeof(params.errFun) === 'function'){
                        params.errFun(err);
                    }else{
                        console.log(' Insert error '+ err);
                    }
                    return;

                }
                if(res){
                    if(typeof(params.successFun) === 'function'){
                        params.successFun(res);
                    }
                }
                console.error('insert end '+res);
                return;
            });//*/
        }
    };
}

function get_update(collection){
    //console.log('create update from basic_model');
    return function(params){ // errFun, where, set, successFun
        if( params.where !== undefined &&
            params.set !== undefined &&
            typeof(params.where) === 'object' &&
            typeof(params.set) === 'object'
           ){
            var opts = {};
            if(params.options !== undefined && typeof(params.options) === 'object' ){opts = params.options;}

            collection.update(params.where , params.set, opts,  function(err, res) {
                //console.log('<<update>> ' + JSON.stringify( params ) + ' '+ JSON.stringify( res ));
                if(err){
                    if(typeof(params.errFun) === 'function'){
                        params.errFun(err);
                    }else{
                        console.log(' Update error '+ err);
                    }
                    return;
                }

                if(typeof(params.successFun) === 'function'){
                    params.successFun(res);
                }
                return;
            });//*/
        }
    };
}

function get_remove(collection){
    return function(params){ // errFun, where, set, successFun
        if( params.where !== undefined &&
            typeof(params.where) === 'object'
           ){
            collection.remove(params.where, function(err, res) {
                if(err){
                    if(typeof(params.errFun) === 'function'){
                        params.errFun(err);
                    }else{
                        console.log(' Remove error '+ err);
                    }
                    return;
                }
                if(res){
                    if(typeof(params.successFun) === 'function'){
                        params.successFun(res);
                    }
                }
                return;
            });//*/
        }
    };
}

function find(collection){//procFunc, [request | where] , filter, sort, errFunc) {

    return function(params){
        //console.log('get function '+ JSON.stringify(req)+ JSON.stringify(filter));

        var dataF = createDataProcessor(params.procFunc, params.errFunc);

        var stub;

        var request = params.request || params.where || null;

        if(request !== null){
            if(params.filter !== undefined){
                stub =  collection.find( request, params.filter );
            }else{
                stub =  collection.find( request );
            }
        } else {
            stub =  collection.find();
        }

        if(params.sort !== undefined){
            stub = stub.sort(params.sort);
            //console.log(params.sort);
        }
        stub.toArray(function(err, result) {return dataF(err, result); });
        //user.find({id:5}, {id:1, email:1}).toArray(function(err, result) {console.log('got '+JSON.stringify(err) + ' '+JSON.stringify(result));return dataF(err, result); });
        return;
    };
}


function createDataProcessor(func, errFunc){
    return function(err, res){
        //console.log('inside created function');
        if(err){
            if(typeof(errFunc) === 'function'){
                return errFunc(err);
            }
            return function(){console.log(' find error '+ err);};
        }
        //console.log('go to FUN with '+ JSON.stringify(res));
        if(typeof(func) === 'function'){
            return func(res);
        }
        return function(){console.log(' process function not defined ');};
    };
}
