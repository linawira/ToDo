'use strict'

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

// mongoose = require('mongoose'),
// Todo = mongoose.model('todos');

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/todos/:userId', function (req, res, next){
        logger.log('Find ToDos by Id', 'verbose');

        // var query = Todo.find()
        // .sort(req.query.order)
        // .exec()
        // .then(result => {
        //    if(result && result.length) {
        //      res.status(200).json(result);
        //  } else {
        //      res.status(404).json({message: "No todos"});
        //  }
        // })
        // .catch(err => {
        //   return next(err);
        // });

        res.status(200).json({message: 'Find ToDos by Id'});

    });

    router.get('todos/todoId', function (req, res, next){
        logger.log('Get My ToDo List'+ req.params.userId, 'verbose');

        // User.findById(req.params.userId)
        //             .then(user => {
        //                 if(user){
        //                     res.status(200).json(user);
        //                 } else {
        //                     res.status(404).json({message: "No user found"});
        //                 }
        //             })
        //             .catch(error => {
        //                 return next(error);
        //             });
        //     }); 

        res.status(200).json({message: 'Get My ToDo List'+ req.params.userId});
    });    

    router.post('todos/todoId', function(req, res, next){
        logger.log('Create todo', 'verbose');

    //     var todo = new todo(req.body);
    //     todo.save()
    //    .then(result => {
    //        res.status(201).json(result);
    //    })
    //    .catch( err => {
    //       return next(err);
    //    });

        res.status(201).json({message: 'ToDo created'+ req.params.userId});

    });
    
    router.put('todos/todoId', function (req, res, next){
        logger.log('Update todo'+ req.params.userId, 'verbose');

        
        //     User.findOneAndUpdate({_id: req.params.userId}, 		
        //     req.body, {new:true, multi:false})
        //         .then(user => {
        //             res.status(200).json(user);
        //         })
        //         .catch(error => {
        //             return next(error);
        //         });

        res.status(200).json({message: 'Update ToDo'+ req.params.userId});
    });  

    router.delete('todos/todoId', function (req, res, next){
        logger.log('Delete ToDo'+ req.params.userId, 'verbose');

        // User.remove({ _id: req.params.todoId })
        //         .then(user => {
        //             res.status(200).json({msg: "User Deleted"});
        //         })
        //         .catch(error => {
        //             return next(error);
        //         });

        res.status(200).json({message: 'Delete ToDo'+ req.params.userId});
    });  

//     router.post('/login', function(req, res, next){
//         console.log(req.body);
//         var email = req.body.email
//         var password = req.body.password;
  
//         var obj = {'email' : email, 'password' : password};
//       res.status(201).json(obj);
//   });
  
};
