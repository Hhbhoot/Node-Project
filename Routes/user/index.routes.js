const express = require('express');
const user = express.Router();


const cartRoutes   = require('./cart.routes')
const orderRoutes = require('./order.routes')
const  userRoutes  = require('./user.routes')
const reviewRoutes = require('./review.routes');

user.use('/cart' , cartRoutes)
user.use('/order' , orderRoutes)
user.use('/' , userRoutes)
user.use('/review' , reviewRoutes)

module. exports = user ;