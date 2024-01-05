const mongoose = require("mongoose");
const User = require("../../Model/user.model");

exports.getAllUser = async (req, res) => {
  try {
    let allUser = await User.find({ is_admin : 'off'});
    // console.log(allUser);

    if (allUser) {
      return res.json(allUser);
    } else {
      return res.json({ message: "No user Found.." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error.." });
  }
};

exports.getSpecificUser = async (req, res) => {
  try {
    const { id } = req.body;
    let user = await User.findById(id , { is_admin : "off"});
    if (user) {
      return res.status(200).json({ message: "user Found..", UserData: user });
    } else {
      return res.status(404).json({ message: "User not Found.." });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server erroor..",
      Error: error.message,
    });
  }
};



