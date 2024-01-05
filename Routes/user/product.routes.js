const express = require('express');
const { verifyToken } = require('../../Helpers/verifyToken');
const { getAllProducts, getProduct } = require('../../Controller/user/product.controller');
const productRoutes = express.Router();

productRoutes.get('/getallproducts',verifyToken,getAllProducts);
productRoutes.get('/getproduct',verifyToken,getProduct);

module.exports = productRoutes;
