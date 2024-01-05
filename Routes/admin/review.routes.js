const express = require('express');
const { getAllUsersReview, specificUserReview } = require('../../Controller/admin/review.controller');
const reviewRoutes = express.Router();

reviewRoutes.get('/getalluserreview',getAllUsersReview);
reviewRoutes.get('/getspecificuserreview',specificUserReview);

module.exports = reviewRoutes ;