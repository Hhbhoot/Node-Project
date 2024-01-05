const express = require('express');
const { getAllOrders, getSpecificUserOrder } = require('../../Controller/admin/order.controller');
const orderRoutes = express.Router();

orderRoutes.get('/getallarders',getAllOrders);
orderRoutes.get('/getspecificuserorder',getSpecificUserOrder);

module.exports = orderRoutes ;