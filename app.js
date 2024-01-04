require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const port = process.env.PORT;
const connectDB = require('./connection');
const imagepath = path.join(__dirname,'public/images');
const morgan = require("morgan");

const cartRoutes = require('./Routes/user/cart.routes');
const userRoutes = require('./Routes/user/user.routes')
const orderRoutes = require('./Routes/user/order.routes');
const adminRoutes = require('./Routes/admin/cart.routes');
const favouriteRoutes = require('./Routes/user/favourite.routes');
const productRoutes = require('./Routes/admin/product.routes');
const reviewRoutes = require('./Routes/user/review.routes');

//  const admin = require('./Routes/admin/index');
// const user = require('./Routes/user/index.routes');


app.use('/public/images',express.static(imagepath))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views/users'))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

app.use('/',userRoutes);
app.use('/user/cart',cartRoutes);
app.use('/order',orderRoutes);
app.use('/favourite',favouriteRoutes);
app.use('/review',reviewRoutes);

app.use('/admin',adminRoutes);
app.use('/admin/product',productRoutes);

// app.use('/admin',admin);

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`server started at http://localhost:${port}/register`)
        connectDB;
        

    }
})