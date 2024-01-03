const { default: mongoose } = require("mongoose");
const Cart = require("../../Model/cart.model");
const Product = require("../../Model/product.model");
const User = require("../../Model/user.model");

exports.addToCart = async (req, res) => {
  try {
    let { cartitem, quantity } = req.body;
    cartitem = new mongoose.Types.ObjectId(cartitem);

    let isProduct = await Cart.findOne({
      cartitem: cartitem,
      user: req.user._id,
    });
    console.log(isProduct);
    if (isProduct) {
      return res.json({ message: "item already exists in cart" });
    }

    let product = await Product.findById(cartitem);
    console.log(product);
    if (!product) {
      return res.json({ message: "Product Not Found.." });
    }

    let cart = await Cart.create({
      user: req.user._id,
      cartitem,
      quantity,
    });
    cart.save();
    return res.json({ message: "Item added successfully..", CartData: cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error.." });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    let cartItem = req.query.id;

    // cartItem = new mongoose.Types.ObjectId(cartItem);

    let userCart = await Cart.find({ user: req.user._id, isDelete: false });
    console.log(userCart);
    if (userCart) {
      return res.json({ message: "Your Cart", userCart });
    } else {
      return res.json({ message: "Cart not Found.." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Imternal server Error.." });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartitem, quantity } = req.body;

    let updateCart = await Cart.findOneAndUpdate(
      { cartitem: cartitem, user: req.user._id },
      { $set: { quantity: quantity } },
      { new: true }
    );
    updateCart.save();

    if (updateCart) {
      return res
        .status(200)
        .json({ message: "Cart Updated Successfully..", Data: updateCart });
    } else {
      return res.status(404).json({ message: "Cart Not Found..." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error..." });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let userCart = await Cart.updateMany(
      { user: req.user._id, isDelete: false },
      { $set: { isDelete: true } },
      { new: true }
    );
    if (userCart) {
      return res
        .status(200)
        .json({ message: "cart is Empty..", Data: userCart });
    } else {
      return res.json({ message: "Cart not Found..." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error.." });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartitem } = req.body;

    let userCart = await Cart.findOneAndUpdate(
      { user: req.user._id, cartitem: cartitem },
      { $set: { isDelete: true } }
    );
    if (userCart) {
      return res
        .json({ message: "Successfully Removed From cart.." });
    } else {
      return res.status(404).json({ message: "Cart not found.." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server Error.." });
  }
};
