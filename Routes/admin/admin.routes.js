const express = require("express");
const {
  getAllUser,
  getSpecificUser,
} = require("../../Controller/admin/user.controller");

const adminRoutes = express.Router();

adminRoutes.get("/getalluser", getAllUser);
adminRoutes.get("/getspecificuser", getSpecificUser);

module.exports = adminRoutes;
