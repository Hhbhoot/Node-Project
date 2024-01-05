const express = require('express');
const reviewRoutes = express.Router();
const { verifyToken } = require('../../Helpers/verifyToken');
const { reviewProduct, deleteReview } = require('../../Controller/user/review.controller');

reviewRoutes.post('/reviewproduct',verifyToken,reviewProduct);
reviewRoutes.put('/deletereview',verifyToken,deleteReview);

module.exports = reviewRoutes ;