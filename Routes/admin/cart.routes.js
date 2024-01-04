const express = require("express");
const cartRoutes = express.Router();

const {
    getAllUserCarts,
    getspecificUserCart
} = require('../../Controller/admin/cart.controller')

cartRoutes.get("/getalluserscart", getAllUserCarts);
cartRoutes.get("/getspecificusercart", getspecificUserCart);

module.exports = cartRoutes ;