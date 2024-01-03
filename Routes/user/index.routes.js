const express = require('express');
const user = express.Router();


const { cartRoutes  } = require('./cart.routes')
const { orderRoutes  } = require('./order.routes')
const { userRoutes } = require('./user.routes')

user.use('/cart' , cartRoutes)
user.use('/order' , orderRoutes)
user.use('/user' , userRoutes)

module. exports = user ;