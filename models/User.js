const mongoose = require('mongoose');

const userSchema= new mongoose.Schema
({
    "fullname":{
        type:String,
        required:true,
    },
    "email":{
        type: String,
        required:[true, "can't be empty"],
        match:[/\S+@\S+\.\S+/,'Invalid'],
    },
    "phone":
    {
        type: Number,
        required:true,
        length: 10,
    },
    "password":
    {
        type: String,
        required:true,
        minlength:5,
    }
});

const User=mongoose.model('User',userSchema);
module.exports = User;