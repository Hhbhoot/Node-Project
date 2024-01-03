const express = require("express");
const {
  getAllUser,
  getSpecificUser,
  getAllUserCarts,
  getspecificUserCart,
  
} = require("../../Controller/admin/admin.controller");
const userRoutes = express.Router();


userRoutes.get("/getalluser", getAllUser);
userRoutes.get("/getspecificuser", getSpecificUser);
userRoutes.get("/getalluserscart", getAllUserCarts);
userRoutes.get("/getspecificusercart", getspecificUserCart);



module.exports = userRoutes;
