const express = require('express');
const { addProduct, updateProduct, deleteProduct } = require('../Controller/admin/product.controller');
const { upload } = require('../Helpers/imageupload');

const productRoutes = express.Router();

productRoutes.post('/addproduct',upload.single('image'),addProduct);
productRoutes.post('/updateproduct',updateProduct);
productRoutes.post('/deleteproduct',deleteProduct);

module.exports = productRoutes ;