const express = require('express');
const cartRoutes = express.Router();
const { addToCart, getUserCart, updateCart, removeFromCart, clearCart } = require('../../Controller/user/cart.controller');

cartRoutes.post('/addtocart',addToCart);
cartRoutes.get('/getusercart',getUserCart);
cartRoutes.put('/updatecart',updateCart);
cartRoutes.put('/emptyCart',clearCart);
cartRoutes.put('/removefromcart',removeFromCart);

module.exports = cartRoutes ;