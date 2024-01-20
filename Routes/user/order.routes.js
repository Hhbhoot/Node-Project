const express = require('express');
const { addToOrder, cancelOrder, updateOrder } = require('../../Controller/user/order.controller');
const orderRoutes = express.Router();

orderRoutes.post('/addtoorder',addToOrder);
orderRoutes.put('/cancelorder',cancelOrder);
orderRoutes.put('/updateorder',updateOrder);

module.exports = orderRoutes ;