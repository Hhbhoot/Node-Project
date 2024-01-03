require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const port = process.env.PORT;
const connectDB = require('./connection');
const userRoutes = require('./Routes/user.routes')
const imagepath = path.join(__dirname,'public/images');
const morgan = require("morgan");

const cartRoutes = require('./Routes/cart.routes');
const adminRoutes = require('./Routes/admin.routes');
const orderRoutes = require('./Routes/order.routes');

app.use('/public/images',express.static(imagepath))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views/users'))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

app.use('/',userRoutes);
app.use('/user/cart',cartRoutes);
app.use('/admin',adminRoutes);
app.use('/order',orderRoutes);


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`server started at http://localhost:${port}/register`)
        connectDB;
        

    }
})