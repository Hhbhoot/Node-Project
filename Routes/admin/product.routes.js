const express = require('express');
const productRoutes = express.Router();

const {
    addProduct,
    updateProduct,
    deleteProduct,
} = require('../../Controller/admin/product.controller')
const { upload } = require('../../Helpers/imageupload');

productRoutes.post("/addproduct", upload.single("image"), addProduct);
productRoutes.post("/updateproduct", updateProduct);
productRoutes.post("/deleteproduct", deleteProduct);

module.exports = productRoutes ;