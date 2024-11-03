const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    image:{
        type:String
    }
});

const UserModel = mongoose.model('auth-collection', userSchema);
module.exports = UserModel;