const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const employeeSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    role: {type: String, required:true},
    status: {type: Boolean, required:true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true}
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Employee', employeeSchema);