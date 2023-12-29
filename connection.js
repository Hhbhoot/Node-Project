const mongoose = require('mongoose');

async function connectDB() {

    await mongoose.connect('mongodb://127.0.0.1:27017/MyApp')
};

connectDB().then(() => {
    console.log('MongoDb Connected...');
}).catch((err) => {
    console.log(err);
})

module.exports = connectDB;