'use strict';
var express = require('express');
var routes = require('express-route');  // route collector

var app_parts = require('./app_parts'); //basic abstructions of bootstrup application 
//--------------------------------------------------------- 
var app = express();
 
app_parts.preRoutes(app); // operations before routes are imputed into APP (midlewares)
  
routes(app, __dirname + "/routes", {
            sync: true,
            ensureRestriction: app_parts.routesRestricted
       });

app_parts.postRoutes(app); // operations after routes are imputed into APP (midlewares) - 404 etc.
 
app.listen(2020);
console.log('Listening on port 2020...');
//console.log(app.routes);