const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
var generateTaskID = () => {
    var objID = (mongoose.Types.ObjectId().toHexString());
    var objIDResult = "U_" + (objID.slice(objID.length - (1 + 3), objID.length));
    return objIDResult
}

var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    emailID: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    userID: {
        type: String,
        default: generateTaskID()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
})


// UserSchema.methods.passwordEncryption = function () {
//     var user = this;
    
// }

UserSchema.methods.generateToken = function () {
    var user = this;
    var token = jwt.sign({ _id: user._id }, user.password);
    return token;    
}

var User = mongoose.model('User', UserSchema)

module.exports = { User }