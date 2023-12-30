const mongoose = require('mongoose');

async function connectDB() {

    await mongoose.connect(process.env.MONGO_DB_URL);
};

connectDB().then(() => {
    console.log('MongoDb Connected...');
}).catch((err) => {
    console.log(err);

})

module.exports = connectDB;