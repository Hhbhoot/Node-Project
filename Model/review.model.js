const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    productname : {
        type : String,
        required : true
    },
    cartitem : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    review : {
        type : String,
        required : true
     },
     rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
     },
     avg_rating : {
         type : Number,
         min : 0 ,
         max : 5,
         default : 0
     }
});

module.exports = mongoose.model('review',reviewSchema);