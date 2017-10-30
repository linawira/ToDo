var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//define schema properties  
//required: true means require validation
//unique: true means it has to be unique no duplication
var mySchema = new Schema({
    documentType :{type: String, required: true},
    firstName:{type:String, required: true}, 
    lastName: {type:String, required: true},
    phoneNumber: {type: Number, required: true},
    email:{type:String, required: true, unique: true},
    password: {type: String, required: true},
});

//create and export the model
module.exports = 
 Mongoose.model('users', mySchema);
