const express = require('express');
const admin = express.Router();

const  userRoutes = require('./admin.routes')
const productRoutes =require('./product.routes')

admin.use('/user',userRoutes)
admin.use('/products',productRoutes)


module.exports = admin ;