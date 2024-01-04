const express = require('express');
const reviewRoutes = express.Router();
const { verifyToken } = require('../../Helpers/verifyToken');
const { reviewProduct } = require('../../Controller/user/review.controller');

reviewRoutes.post('/reviewproduct',verifyToken,reviewProduct);

module.exports = reviewRoutes ;