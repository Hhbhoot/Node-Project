const express = require('express');
const admin = express.Router();

const adminRoutes = require('./admin.routes')
const productRoutes =require('./product.routes')
const cartRoutes = require('./cart.routes');
const reviewRoutes = require('./review.routes');

admin.use('/user',adminRoutes)
admin.use('/products',productRoutes)
admin.use('/cart',cartRoutes);
admin.use('/review',reviewRoutes);

module.exports = admin ;