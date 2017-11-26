
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('todos'),

    passportService = require('../../config/passport'),
    passport = require('passport'),

    multer = require('multer'),
    mkdirp = require('mkdirp');
    

    var requireAuth = passport.authenticate('jwt', { session: false });
    

module.exports = function (app, config) {
    app.use('/api', router);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
    var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
    
    router.get('/todos/user/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get ToDos for a user', + req.params.userId, 'verbose');

        Todo.find ({userId: req.params.userId})
        .then(todos => {
            if(todos){
                res.status(200).json (todos);
            } else {
                return next (error);
            }
        });

    });

    //     var query = Todo.find({userId:req.params.userId})
    //     .sort(req.query.order)
    //     .exec()
    //     .then(result => {
    //        if(result && result.length) {
    //          res.status(200).json(result);
    //      } else {
    //          res.status(404).json({message: "No todos"});
    //      }
    //     })
    //     .catch(err => {
    //       return next(err);
    //     });
    // });  

    //     res.status(200).json({message: 'Find ToDos by Id'});

    // });

    router.get('/todos/:todoId',requireAuth, function (req, res, next){
        logger.log('Get ToDo with ID todoID'+ req.params.todoId, 'verbose');

        Todo.findById(req.params.todoId)
                    .then(todo => {
                        if(todo){
                            res.status(200).json(todo);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 

    //     res.status(200).json({message: 'Get My ToDo List'+ req.params.userId});
    // });    

    router.post('/todos', function(req, res, next){
        logger.log('Create a todo', 'verbose');

        var todo = new Todo(req.body);
        todo.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
    });  

    //     res.status(201).json({message: 'ToDo created'+ req.params.userId});

    // });
    
    router.put('/todos/:todoId', /*requireAuth,*/ function (req, res, next){
        logger.log('Update todo with id todoid'+ req.params.todoId, 'verbose');

        
        Todo.findOneAndUpdate({_id: req.params.todoId}, 		
            req.body, {new:true, multi:false})
                .then(todo => {
                    res.status(200).json(todo);
                })
                .catch(error => {
                    return next(error);
                });
    });

    //     res.status(200).json({message: 'Update ToDo'+ req.params.userId});
    // });  

    router.delete('/todos/:todoId',/* requireAuth,*/function (req, res, next){
        logger.log('Delete ToDo with id todoid'+ req.params.todoId, 'verbose');

        Todo.remove({ _id: req.params.todoId })
                .then(user => {
                    res.status(200).json({msg: "todo Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
    });

    //     res.status(200).json({message: 'Delete ToDo'+ req.params.userId});
    // });  

//     router.post('/login', function(req, res, next){
//         console.log(req.body);
//         var email = req.body.email
//         var password = req.body.password;
  
//         var obj = {'email' : email, 'password' : password};
//       res.status(201).json(obj);
//   });
  
var upload = multer({ storage: storage });

router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
    logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
    
    Todo.findById(req.params.todoId, function(err, todo){
        if(err){ 
            return next(err);
        } else {     
            if(req.files){
                todo.file = {
                    fileName : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }           
            todo.save()
                .then(todo => {
                    res.status(200).json(todo);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});


};
