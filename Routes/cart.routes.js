const express = require('express');
const cartRoutes = express.Router();
const { verifyToken } = require('../Helpers/verifyToken');
const { addToCart } = require('../Controller/user/cart.controller');

cartRoutes.post('/addtocart',verifyToken,addToCart)

module.exports = cartRoutes ;