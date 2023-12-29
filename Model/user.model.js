const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },

    username:
    {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },

    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,

    },
    Image : [{
        type : String
    }],
    isDelete : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('users', userSchema);