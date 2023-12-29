require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require('./connection');

const morgan = require("morgan")
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`server started at http://localhost:${port}`)
        connectDB;

    }
})