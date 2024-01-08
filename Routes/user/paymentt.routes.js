const express= require('express');
const { placeOrder } = require('../../Controller/user/payment.controller');
const paymentRoutes = express.Router();

paymentRoutes.post('/placeorder',placeOrder);

module.exports = paymentRoutes ;