const express = require("express");
const {
  getAllUser,
  getSpecificUser,
  getAllUserCarts,
  getspecificUserCart,
  
} = require("../../Controller/admin/admin.controller");
const cartRoutes = express.Router();


cartRoutes.get("/getalluser", getAllUser);
cartRoutes.get("/getspecificuser", getSpecificUser);
cartRoutes.get("/getalluserscart", getAllUserCarts);
cartRoutes.get("/getspecificusercart", getspecificUserCart);

module.exports = cartRoutes;
