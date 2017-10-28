//config.js contains configuration data

var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {name: 'exam'},    
            port: 5000,  
            db: 'mongodb://127.0.0.1/exam-dev' //connect to mongodb
 },  

  };

//export the config determined by the env variable
module.exports = config[env];
