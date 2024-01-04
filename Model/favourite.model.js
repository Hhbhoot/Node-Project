const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({

    username : {
         type : String,
         required : true
    },
    user : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'users'
    },
    product : {
        type : String,
    },
     cartitem :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products'
        }],
    price : {
        type : Number
    },
    isDelete : {
        type : Boolean,
        default : false
    }    
    
})

module.exports = mongoose.model('favourite',favouriteSchema);