//express.js contains most of the server configuration code

//load required libraries and plugins
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');

module.exports = function (app, config) {

//connect to mongodb using mongoose 
 mongoose.Promise = require('bluebird');
 mongoose.connect(config.db, {useMongoClient: true});
 var db = mongoose.connection;
 db.on('error', function () {
   throw new Error('unable to connect to database at ' + config.db);
 });
 
   mongoose.set('debug', true);
   mongoose.connection.once('open', function callback() {
     console.log("Mongoose connected to the database");
   });
  
    app.use(function (req, res, next) {
      console.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });

  //(bodyParser.json) returns middleware that only parses json
  //(bodyParser.urlencoded) returns middleware that only parses urlencoded bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
    }));

  // load the models and controllers 
    var models = glob.sync(config.root + '/app/models/*.js');
   models.forEach(function (model) {
     require(model);
   });
  
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
   controllers.forEach(function (controller) {
    require(controller)(app, config);
   });

  //static server route
   app.use(express.static(config.root + '/public'));
  
  //adding error handlers
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
  
    app.use(function (err, req, res, next) {
      res.type('text/plan');
      res.status(500);
      res.send('500 Sever Error');  
    });
  
    console.log("Starting application");
  
  };
