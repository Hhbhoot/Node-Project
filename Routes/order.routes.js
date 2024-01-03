const express = require('express');
const { verifyToken } = require('../Helpers/verifyToken');
const { addToOrder } = require('../Controller/user/order.controller');
const orderRoutes = express.Router();

orderRoutes.post('/addtoorder',verifyToken,addToOrder);

module.exports = orderRoutes ;