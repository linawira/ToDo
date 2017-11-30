var express = require('express'),
config = require('./config/config');    
var logger = require ('./config/logger');

//create app objects
var app = express();    

//require services
require('./config/express')(app, config);
logger.log("Creating HTTP server on port: " + config.port);

require('http').createServer(app).listen(config.port, function () {
logger.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

module.exports= app;