const express = require('express');
const admin = express.Router();

const adminRoutes = require('./admin.routes')
const productRoutes =require('./product.routes')
const cartRoutes = require('./cart.routes');

admin.use('/user',adminRoutes)
admin.use('/products',productRoutes)
admin.use('/cart',cartRoutes);

module.exports = admin ;