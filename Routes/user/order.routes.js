const express = require('express');
const { verifyToken } = require('../../Helpers/verifyToken');
const { addToOrder, cancelOrder, updateOrder } = require('../../Controller/user/order.controller');
const orderRoutes = express.Router();

orderRoutes.post('/addtoorder',verifyToken,addToOrder);
orderRoutes.put('/cancelorder',verifyToken,cancelOrder);
orderRoutes.put('/updateorder',verifyToken,updateOrder);

module.exports = orderRoutes ;