const express = require('express');
const user = express.Router();

const { verifyToken } =require('../../Helpers/verifyToken')

const cartRoutes   = require('./cart.routes');
const orderRoutes = require('./order.routes');
const  userRoutes  = require('./user.routes');
const reviewRoutes = require('./review.routes');
const productRoutes = require('./product.routes');

user.use('/cart' ,verifyToken, cartRoutes);
user.use('/order' , verifyToken,orderRoutes);
user.use('/' , verifyToken,userRoutes);
user.use('/review' , verifyToken,reviewRoutes);
user.use('/product',verifyToken,productRoutes);

module. exports = user ;