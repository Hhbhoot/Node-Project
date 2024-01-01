require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const port = process.env.PORT;
const connectDB = require('./connection');
const userRoutes = require('./Routes/user.routes')
const imagepath = path.join(__dirname,'public/images');


const morgan = require("morgan");
app.use('/public/images',express.static(imagepath))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views/users'))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

app.use('/',userRoutes)


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`server started at http://localhost:${port}/register`)
        connectDB;
        

    }
})