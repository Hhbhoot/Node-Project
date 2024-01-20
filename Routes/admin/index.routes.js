const express = require('express');
const admin = express.Router();

const { verifyToken } = require("../../verifyToken");
const{verifyAdmin } = require('../../admin.verify')


const adminRoutes = require('./admin.routes')
const productRoutes =require('./product.routes')
const cartRoutes = require('./cart.routes');
const reviewRoutes = require('./review.routes');
const orderRoutes = require('./order.routes');

admin.use('/user',verifyToken,verifyAdmin,adminRoutes)
admin.use('/products',verifyToken,verifyAdmin,productRoutes)
admin.use('/cart',verifyToken,verifyAdmin,cartRoutes);
admin.use('/review',verifyToken,verifyAdmin,reviewRoutes);
admin.use('/order',verifyToken,verifyAdmin,orderRoutes);

module.exports = admin ;