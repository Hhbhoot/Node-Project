const express = require("express");
const {
  getAllUser,
  getSpecificUser,
  getAllUserCarts,
  getspecificUserCart,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/admin/admin.controller");
const adminRoutes = express.Router();
const { upload } = require("../Helpers/imageupload");

adminRoutes.post("/addproduct", upload.single("image"), addProduct);
adminRoutes.post("/updateproduct", updateProduct);
adminRoutes.post("/deleteproduct", deleteProduct);

adminRoutes.get("/getalluser", getAllUser);
adminRoutes.get("/getspecificuser", getSpecificUser);
adminRoutes.get("/getalluserscart", getAllUserCarts);
adminRoutes.get("/getspecificusercart", getspecificUserCart);

module.exports = adminRoutes;
