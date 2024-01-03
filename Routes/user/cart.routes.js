const express = require('express');
const cartRoutes = express.Router();
const { verifyToken } = require('../../Helpers/verifyToken');
const { addToCart, getUserCart, updateCart, removeFromCart, clearCart } = require('../../Controller/user/cart.controller');

cartRoutes.post('/addtocart',verifyToken,addToCart);
cartRoutes.get('/getusercart',verifyToken,getUserCart);
cartRoutes.put('/updatecart',verifyToken,updateCart);
cartRoutes.put('/emptyCart',verifyToken,clearCart);
cartRoutes.put('/removefromcart',verifyToken,removeFromCart);

module.exports = cartRoutes ;