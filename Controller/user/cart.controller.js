const { default: mongoose } = require("mongoose");
const Cart = require("../../Model/cart.model");
const Product = require("../../Model/product.model");

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
