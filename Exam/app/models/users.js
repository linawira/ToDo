var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//define schema properties
var mySchema = new Schema({
    firstName:{type:String, required: true},
    lastName: {type:String, required: true},
    email:{type:String, required: true, unique: true},
    password: {type: String, required: true},
    dateRegistered: {type:Date, default:Date.now},
    status: {type: Boolean, default: true},
});

//create and export the model
module.exports = 
 Mongoose.model('users', mySchema);
