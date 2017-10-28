//index.js contains the bare minimum  code required to bootstrap the application

var express = require('express'),
config = require('./config/config'); 

//create express object
var app = express();    

//require services/ configure express object
require('./config/express')(app, config);
console.log("Creating HTTP server on port: " + config.port);

//start server
require('http').createServer(app).listen(config.port, function () {
console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

//module.exports= app;