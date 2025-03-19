const { required } = require('joi');
const { Admin } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    mobile : {
        type:String,
        required:false
    },
    role : {
        type:String,
        default: 'user'
    },
    password : {
        type:String,
        required:true
    },
    createdAt :{
        type: Date,
        default :Date.now()
    }
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;