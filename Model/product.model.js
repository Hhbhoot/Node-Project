const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    image :[{
        type : String,
    }],
    price: {
        type: Number,
        required: true
    },
    created_at:
        { type: Date, 
         default : Date.now()
        },
    updated_at:
    {
        type: Date,
        default: Date.now
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('products',productSchema);