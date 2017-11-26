var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

priorities = ['Low', 'Medium', 'High', 'Critical'];

var myTodoSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, required: true },
        todo: { type: String, requred: true },
        description:{type: String},
        dateCreated: {type:Date, default:Date.now},
        dateDue:{type:Date, default:Date.now},
        completed: {type: Boolean, default: false},
        priority: {type: String, enum: priorities},
        file: {
            fileName: { type: String},
            originalName: {type: String},
            dateUploaded: {type: Date, default: Date.now}
        },
    });
    
    module.exports = 
     Mongoose.model('todos', myTodoSchema);
    