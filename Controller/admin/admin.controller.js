const mongoose = require("mongoose");
const User = require("../../Model/user.model");
const Cart = require("../../Model/cart.model");
const Product = require("../../Model/product.model");

exports.getAllUser = async (req, res) => {
  try {
    let allUser = await User.find();
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
    let user = await User.findById(id);
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

exports.getAllUserCarts = async (req, res) => {
  try {
    let allCarts = await Cart.find();
    if (allCarts) {
      return res.status(200).json(allCarts);
    } else {
      return res.json({ message: "Not found any users cart.." });
    }
  } catch (error) {
    console.log(error);
    return es, json({ message: "Internal server error", Error: error.message });
  }
};

exports.getspecificUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let userCart = await Cart.find({ user: userId });
    if (userCart) {
      return res.status(200).json(userCart);
    } else {
      return res.json({ message: "User cart not found.." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error.." });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    let product = await Product.findOne({ name: name, isDelete: false });

    if (product) {
      return res.json({ message: "product already exists.." });
    }
    let photos = [];
    if (req.file) {
      photos = `${req.file.path.replace(/\\/g, "/")}`;
    }

    product = await Product.create({
      name,
      category,
      description,
      image: photos,
      price,
    });
    product.save();

    return res
      .status(201)
      .json({ message: "Product added successfully...", ProductData: product });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal Server Error.." });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let { price } = req.body;

    const id = new mongoose.Types.ObjectId(req.query.id);
    //  console.log(id);

    let product = await Product.findById(id);
    console.log(product);
    if (!product) {
      return res.json({ message: "product not Found.." });
    }
    product.price = price;
    product.save();

    return res
      .status(200)
      .json({ message: "Product Updated Successfully...", Data: product });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "internal Server.." });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Product.findById(id);
    if (!product) {
      return res.json({ message: "Product not found.." });
    }
    product = await Product.findByIdAndUpdate(id, { $set: { isDelete: true } });
    product.save();
    return res.json({ message: "Product deleted successfully..." });
  } catch (error) {
    console.log(err);
    return res.json(error);
  }
};

