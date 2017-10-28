var express = require('express'),
    router = express.Router(), //router object manages routes

// import the users model
    mongoose = require('mongoose'),
    User = mongoose.model('users');

//export function creates exportable module
// (app,config) pass in express and config object
//('/api', router) declare the router as an express middleware and set the default URL prefix to /api
module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/users', function (req, res, next){
        console.log('Get all users', 'verbose');

       var query = User.find()
       .then(result => {
      	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No users"});
		}
       })
       .catch(err => {
         return next(err);
       });
   });

    router.get('/users/:userId', function (req, res, next){
        console.log('Get user'+ req.params.userId, 'verbose');

       User.findById(req.params.userId)
                   .then(user => {
                       if(user){
                           res.status(200).json(user);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });    

    router.post('/users', function(req, res, next){
        console.log('Create user', 'verbose');

       var user = new User(req.body);
        user.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    router.put('/users/:userId', function (req, res, next){
        console.log('Update user'+ req.params.userId, 'verbose');

           User.findOneAndUpdate({_id: req.params.userId}, 		
           req.body, {new:true, multi:false})
               .then(user => {
                   res.status(200).json(user);
               })
               .catch(error => {
                   return next(error);
               });
       });  

    router.delete('/users/:userId', function (req, res, next){
        console.log('Delete user'+ req.params.userId, 'verbose');

       User.remove({ _id: req.params.userId })
               .then(user => {
                   res.status(200).json({msg: "User Deleted"});
               })
               .catch(error => {
                   return next(error);
               });
       });

    router.post('/login', function(req, res, next){
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
  
        var obj = {'email' : email, 'password' : password};
      res.status(201).json(obj);
  });
  
};
